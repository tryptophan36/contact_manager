# Contact Management Project

## Features

### 1. Contact List

The **Contact List** tab provides a table view of all contacts in the database, with features to enhance usability:

- **Dynamic Sorting**: Users can sort contacts by fields:
  - Name
  - Phone
  - Email
  - Company
  - Job Title
- **Search Functionality**: A search box allows users to find specific contacts by typing in relevant keywords.
- **Action Buttons**: Each contact entry has:
  - **Edit**: Opens a form to update the contact's details.
  - **Delete**: Removes the contact from the list.
  
Data is fetched from the backend using Axios, with sorting and search implemented dynamically by passing query parameters and adjusting SQL queries accordingly.

### 2. Add New Contact

The **Add New Contact** tab includes a form with validations for adding new contacts:

- **Form with MUI**: A clean and responsive form built using Material-UI components.
- **Validations**: Ensures fields have valid inputs, including:
  - Required fields (e.g., Name, Phone)
  - Format validation (e.g., email format)
  - Length checks for certain fields
- **Form Submission**: On submission, the form data is sent to the backend using a POST request, where a new contact is added to the MySQL database.

## Database Setup

**Why MySQL?**

MySQL was selected over NoSQL databases like MongoDB because:
 - **Structured Data**: Contacts have a consistent structure and fixed number of columns with known values, making a relational database suitable.
 - **Efficiency**: Relational databases perform well with structured data, whereas NoSQL excels with unstructured or dynamic data.

### Creating a MySQL Database and Table

To set up the database locally, follow these steps:

1. **Start MySQL** and create a new database:

   ```sql
   CREATE DATABASE contact_management;
2. Create the contacts Table:

```sql
USE contact_management;
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL UNIQUE,
  company VARCHAR(100),
  job_title VARCHAR(100)
);
```

## Running the Backend

To set up and run the backend server, follow these steps:

### Navigate to the Backend Directory

```bash
cd backend
```
### Set Up Environment Variables
Create a .env file in the backend directory and add the following fields, replacing placeholders with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=<your username>
DB_PASSWORD=<your password>
DB_NAME=contact_management
```
### Install Dependencies and start the server
```bash
npm install
npm start
```
## Technical Decisions

 ### Dynamic Sorting and Searching
 Sorting and Searching of contacts based on feilds(name,phone,email...) dynamically is done through passing the filters through query params and altering the sql query

  ### Robust Form validation
 Form validations are done both on frontend and backend levels :
  - On Client side it is done through matching regex expressions.
  - On server side it is done through proper value checks and error handling.


