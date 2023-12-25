import pymysql
from datetime import datetime

class Database:
    def __init__(self, app):
        app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net'
        app.config['MYSQL_USER'] = 'sql12672640'
        app.config['MYSQL_PASSWORD'] = 'HbdBywLG3L'
        app.config['MYSQL_DB'] = 'sql12672640'
        app.config['MYSQL_PORT'] = 3306
        app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
        self.app = app

    def get_connection(self):
        return pymysql.connect(
            host=self.app.config['MYSQL_HOST'],
            user=self.app.config['MYSQL_USER'],
            password=self.app.config['MYSQL_PASSWORD'],
            db=self.app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor
        )

    def create_ocr_data_entry(self, data, process_id):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                INSERT INTO ocr_data (
                    Name, Last_Name, Identification_Number, Date_of_issue, Date_of_expiry, Date_of_birth, process_id, update_timestamp
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP
                ) ON DUPLICATE KEY UPDATE process_id = %s, update_timestamp = CURRENT_TIMESTAMP;
            """
            cursor.execute(sql, (
                data['Name'], data['Last_Name'], data['Identification_Number'],
                data['Date_of_issue'], data['Date_of_expiry'], data['Date_of_birth'], process_id, process_id
            ))

            conn.commit()
            cursor.close()
            conn.close()
            return True
        except Exception as e:
            print(f"Error saving to database: {str(e)}")
            return False

    def create_ocr_process_entry(self, status='PENDING'):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                INSERT INTO ocr_process (status, creation_timestamp, is_deleted) VALUES (%s, CURRENT_TIMESTAMP, 0)
            """
            cursor.execute(sql, (status,))

            process_id = cursor.lastrowid

            conn.commit()
            cursor.close()
            conn.close()

            return process_id
        except Exception as e:
            print(f"Error creating OCR process entry: {str(e)}")
            return None

    def update_ocr_process_status(self, process_id, new_status):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE ocr_process SET status = %s WHERE id = %s
            """

            cursor.execute(sql, (new_status, process_id))

            conn.commit()
            cursor.close()
            conn.close()

            return True
        except Exception as e:
            print(f"Error updating OCR process status: {str(e)}")
            return False

    def update_ocr_process_error_message(self, process_id, error_message):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE ocr_process SET error_message = %s WHERE id = %s
            """

            cursor.execute(sql, (error_message, process_id))

            conn.commit()
            cursor.close()
            conn.close()

            return True
        except Exception as e:
            print(f"Error updating OCR process error message: {str(e)}")
            return False

    def mark_process_as_deleted(self, process_id):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE ocr_process SET is_deleted = 1 WHERE id = %s
            """

            cursor.execute(sql, (process_id,))

            conn.commit()
            cursor.close()
            conn.close()

            return True
        except Exception as e:
            print(f"Error marking process as deleted: {str(e)}")
            return False
    
    def mark_data_as_deleted(self, data_id):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE ocr_data SET is_deleted = 1 WHERE id = %s
            """

            cursor.execute(sql, (data_id,))

            conn.commit()
            cursor.close()
            conn.close()

            return True
        except Exception as e:
            print(f"Error marking process as deleted: {str(e)}")
            return False
    
    def list_processes(self, status_filter=None, creation_date_filter=None):
        try:
            # Build SQL query based on filters
            sql = "SELECT * FROM ocr_process WHERE is_deleted = 0"
            params = []

            if status_filter:
                sql += f" AND status = '{status_filter}'"
                # params.append(status_filter)

            if creation_date_filter:
                sql += f" AND DATE(creation_timestamp) = '{creation_date_filter}'"
                # params.append(creation_date_filter)

            # Execute the SQL query
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(sql)
            processes = cursor.fetchall()
            cursor.close()
            conn.close()

            # Convert result to a list of dictionaries
            result = []
            for process in processes:
                print("process")
                print(process['id'])
                result.append({
                    'id': process['id'],
                    'status': process['status'],
                    'creation_timestamp': process['creation_timestamp'].strftime('%Y-%m-%d %H:%M:%S'),
                    'is_deleted': process['is_deleted'],
                    'error_message': process['error_message'],
                })

            return result
        except Exception as e:
            print(f"Error listing processes: {str(e)}")
            return None

    def get_datetime_if_valid(self, datetime):
        try:
            return datetime.strftime('%Y-%m-%d')
        except Exception as e:
            return None
        
    def list_data(self):
        try:
            # Build SQL query based on filters
            sql = "SELECT * FROM ocr_data WHERE is_deleted = 0"

            # Execute the SQL query
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(sql)
            ocr_data_points = cursor.fetchall()
            cursor.close()
            conn.close()

            # Convert result to a list of dictionaries
            # Name, Last_Name, Identification_Number, Date_of_issue, Date_of_expiry, Date_of_birth, process_id, update_timestamp
            result = []
            for ocr_data_point in ocr_data_points:
                result.append({
                    'id': ocr_data_point['id'],
                    'Name': ocr_data_point['Name'],
                    'Last_Name': ocr_data_point['Last_Name'],
                    'Date_of_expiry': self.get_datetime_if_valid(ocr_data_point['Date_of_expiry']),
                    'Date_of_birth': self.get_datetime_if_valid(ocr_data_point['Date_of_birth']),
                    'Date_of_issue': self.get_datetime_if_valid(ocr_data_point['Date_of_issue']),
                    'Identification_Number': ocr_data_point['Identification_Number']
                })

            return result
        except Exception as e:
            print(f"Error listing processes: {str(e)}")
            return None