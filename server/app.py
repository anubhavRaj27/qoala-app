from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
import ThaiPersonalCardExtract as card
from datetime import datetime
from database import Database
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL database configuration
app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net'
app.config['MYSQL_USER'] = 'sql12672640'
app.config['MYSQL_PASSWORD'] = 'HbdBywLG3L'
app.config['MYSQL_DB'] = 'sql12672640'
app.config['MYSQL_PORT'] = 3306

app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Upload folder
app.config['UPLOAD_FOLDER'] = 'images'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

db = Database(app)

mysql = MySQL(app)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def convert_to_mysql_date(date_str):
    try:
        # Remove unnecessary characters from the date string
        cleaned_date_str = date_str.replace('>', '').replace(
            '.', '').replace(',', '').strip()

        # Convert the cleaned date string to a datetime object
        date_object = datetime.strptime(cleaned_date_str, '%d %b %Y')

        # Format the datetime object as a string in MySQL date format
        mysql_date_format = date_object.strftime('%Y-%m-%d')
        return mysql_date_format
    except ValueError as e:
        print(f"Error converting date: {date_str}", e)
        return None


def process_uploaded_file(filename):
    reader = card.PersonalCard(
        lang="mix",
        tesseract_cmd="./tesseract")
    result = reader.extract_front_info(filename)
    data_dict = {
        'Name': result.NameEN,
        'Last_Name': result.LastNameEN,
        'Identification_Number': result.Identification_Number,
        'Date_of_issue': convert_to_mysql_date(result.DateOfIssueEN),
        'Date_of_expiry': convert_to_mysql_date(result.DateOfExpiryEN),
        'Date_of_birth': convert_to_mysql_date(result.BirthdayEN)
    }

    print(data_dict)
    return data_dict


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            process_id = db.create_ocr_process_entry()
            # Assuming you have a function to process the uploaded file and extract data
            extracted_data = process_uploaded_file(file_path)

            # Check if data extraction was successful
            if extracted_data:
                # Save the extracted data to the database
                if db.create_ocr_data_entry(extracted_data, process_id):
                    # Delete the file after processing
                    os.remove(file_path)
                    db.update_ocr_process_status(process_id, 'SUCCESS')
                    return jsonify(extracted_data), 200
                else:
                    return jsonify({'error': 'Error saving data to database'}), 500
            else:
                return jsonify({'error': 'Error extracting data from the file'}), 500

        except Exception as e:
            # Handle exceptions during file processing
            db.update_ocr_process_status(process_id, 'FAILED')
            db.update_ocr_process_error_message(process_id, str(e))
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500

    else:
        return jsonify({'error': 'Invalid file type. Allowed types: png'}), 400

@app.route('/delete/<int:process_id>', methods=['DELETE'])
def delete_process(process_id):
    try:
        # Assuming you have a function to mark the process as deleted
        if db.mark_process_as_deleted(process_id):
            return jsonify({'message': 'Process marked as deleted successfully'}), 200
        else:
            return jsonify({'error': 'Error marking process as deleted'}), 500
    except Exception as e:
        return jsonify({'error': f'Error deleting process: {str(e)}'}), 500

@app.route('/list_processes', methods=['GET'])
def list_processes():
    try:
        # Parse filters from query parameters
        status_filter = request.args.get('status')
        creation_date_filter = request.args.get('creation_date')

        # Use the Database class to handle database queries
        processes = db.list_processes(status_filter, creation_date_filter)

        if processes is not None:
            return jsonify(processes), 200
        else:
            return jsonify({'error': 'Error listing processes'}), 500
    except Exception as e:
        return jsonify({'error': f'Error listing processes: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)