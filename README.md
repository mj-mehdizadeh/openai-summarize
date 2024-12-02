Here is a **README.md** file for your Nest.js test application:

---

# **Document Summarization API**

This is a test application built with **Nest.js** that allows users to upload documents (PDF, DOCX, or TXT) and retrieve their summarized content. The application includes basic user authentication with login and registration functionality.

---

## **Features**

- User Authentication:
    - **Register** a new user.
    - **Login** to generate a JWT token.
- Document Management:
    - **Upload** a document for summarization.
    - **Retrieve** the summarized content of an uploaded document.
- Uses **SQLite** as the database.
- OpenAI API integration for text summarization.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd <repository-directory>
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure the Environment**

Create a `.env` file in the root directory of the project and add the following environment variables:

```dotenv
PORT=3001
JWT_SECRET=secret
JWT_EXPIRE_IN=15m
OPEN_AI_API_KEY=sk-****
```

- **PORT**: Port where the server will run.
- **JWT_SECRET**: Secret key for JWT authentication.
- **JWT_EXPIRE_IN**: JWT token expiration time.
- **OPEN_AI_API_KEY**: OpenAI API key for text summarization.

### **4. Run Migrations (If Applicable)**

Ensure the SQLite database is initialized and migrations are run (if necessary).

```bash
npx prisma migrate dev --name init
```

---

## **Running the Application**

### **Development Mode**
```bash
npm run start:dev
```

### **Production Mode**
```bash
npm run build
npm run start:prod
```

---

## **API Endpoints**

### **Authentication**
#### **1. Register**
**POST** `/auth/register`  
Register a new user.

**Request Body**:
```json
{
  "username": "example_user",
  "password": "example_password"
}
```

#### **2. Login**
**POST** `/auth/login`  
Log in to get a JWT token.

**Request Body**:
```json
{
  "username": "example_user",
  "password": "example_password"
}
```

**Response**:
```json
{
  "accessToken": "your_jwt_token"
}
```

---

### **Document Management**
#### **1. Upload File**
**POST** `/documents/upload`  
Upload a document for summarization.  
**Headers**:  
`Authorization: Bearer <JWT_TOKEN>`

**Form Data**:
- **file**: The document file (PDF, DOCX, or TXT).

#### **2. Get Summary**
**GET** `/documents/summary`  
Retrieve the summary of the uploaded document.  
**Headers**:  
`Authorization: Bearer <JWT_TOKEN>`

---

## **Testing**

To test the application:
1. Register a new user.
2. Log in to obtain a JWT token.
3. Use the token to upload a document.
4. Retrieve the summary of the uploaded document.

---

## **Technologies Used**

- **Nest.js**: Backend framework.
- **SQLite**: Lightweight database.
- **JWT**: Authentication mechanism.
- **Multer**: File upload handling.
- **OpenAI API**: For text summarization.
- **Prisma**: Database ORM.

---

## **License**

This project is licensed under the MIT License.

--- 

Let me know if you want to add specific examples or refine this further!