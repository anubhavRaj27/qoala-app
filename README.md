# Thai ID OCR App-Qoala
## Problem Statement:
Finding exact data of a person and storing it is very important for proper identification of a person and this is quite a cumbersome task when done manually.
## Plausible Solution
My app helps in easing out this process of extracting information.It provides a platform where we can upload our thai card and store the information for each person seggregated properly.
## Key Features
 -We can upload the card with proper error handling including checking if the card is a thai card or not, size of image is 2 mb,image is in the format of png,jpeg or jpg.
 - It shows the seggregated result with in a separate page.
- We also have the crud (create read update and delete)operations that can be performed.

## Dependencies

*For Frontend*
-react: ^version
-react-dom: ^version
-react-router-dom: ^version

*For Backend*
-Flask: ^version
-Flask-MySQLDB: ^version
-MySQL Server: ^version

## Setup Instructions

*For Frontend*

1. Clone the repository.(git clone <repository_url>)
2. Navigate to the project directory.(cd react-router-example)
3. Install dependencies.(npm install)
4. Run the application.(npm start)
-Access the application in your browser at http://localhost:3000/. You'll land on the MainPage by default, and navigating to /results will display the Results page.

* For Backend*

1. MySQL Setup:
-Ensure a MySQL server is running.
-Update the Flask-MySQLDB configuration in your Flask application with appropriate credentials and database details.

2. Flask Application Setup:
-Install required dependencies using pip install flask flask-mysqldb.
-Use the provided Database class in your Flask application by passing the Flask app instance to interact with the database.

3. Usage Example:
-Utilize the methods provided by the Database class to manage OCR data entries and processes in your Flask routes or controllers.

##Overview of the Architecture

1. Frontend:
   - Handles user interaction and displays UI elements.
   - Routes users to different views like the MainPage and ResultsPage.
   - Communicates with the backend via API calls.

2. Backend:
   - Manages data and business logic.
   - Provides API endpoints to handle OCR data entries and processes.
   - Interacts with the MySQL database to store/retrieve OCR-related information.

3. MySQL Database:
   - Stores OCR data entries and process-related information in respective tables (ocr_data and ocr_process).

