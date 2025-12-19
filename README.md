# 🔐 Secure User Profile & Access Control System

## 📌 Project Overview
This project implements a **secure identity and profile management system** with user authentication, encrypted storage of sensitive data, and a protected profile dashboard.  
The system follows best practices for **stateless authentication**, **data security**, and **clean API design**.

The application is divided into:
- **Backend**: Handles authentication, encryption, database operations, and secure APIs.
- **Frontend**: Provides login, registration, and profile dashboard UI with proper error handling and animations.

This project is built as part of the **Full Stack Assignment (GET 2026)** and strictly follows the provided instructions.

---

## 🧱 Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- Node Crypto (AES-256 encryption)

### Frontend
- React
- Axios
- Framer Motion (animations)
- CSS Modules (modern scoped styling)

---

## 🔐 Backend Features

### 1. User Authentication
- Secure **Registration & Login APIs**
- Passwords hashed using **bcrypt**
- Stateless authentication using **JWT**

### 2. Data Security
- Aadhaar / ID number is **never stored in plaintext**
- Encrypted using **AES-256** before saving to the database
- Decrypted **only in memory** before sending data to the client

### 3. Secure Profile API
- Authenticated endpoint to fetch user profile
- JWT token validation middleware
- Returns decrypted Aadhaar/ID securely

---

## 🎨 Frontend Features

### 1. Login & Registration Pages
- UI interacts with backend authentication APIs
- Client-side validation and error handling
- Smooth entrance animations for better user experience

### 2. Profile Dashboard
- Securely fetches user data using JWT
- Displays Name, Email, and decrypted Aadhaar/ID
- Protected from unauthorized access

### 3. Error Handling
- Invalid login credentials
- Unauthorized access
- Network / server errors
- Clear and user-friendly error messages

---

## 🗄️ Database Details

- **Database Provider**: MongoDB Atlas  
- **Cluster Name**: Cluster0  
- **Database Name**: secure-profile  
- **Collection**: users  

MongoDB automatically creates the database and collection inside the cluster when data is first inserted.

### User Schema (Logical Representation)
```json
{
  "name": "String",
  "email": "String",
  "password": "Hashed String",
  "aadhaarEncrypted": "AES-256 Encrypted String"
}
```

---

## 🔗 API Endpoints

### Authentication APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and return JWT |

### Profile API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile/me` | Fetch authenticated user profile |

All protected endpoints require the following HTTP header:

```
Authorization: Bearer <JWT_TOKEN>
```

The profile API is secured using JWT authentication and decrypts the Aadhaar/ID number only before sending it to the client.

---

## ⚙️ Setup & Run Instructions

### Backend Setup
```bash
cd backend
npm install
npm start
```

Create a `.env` file inside the backend directory:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/secure-profile
JWT_SECRET=your_jwt_secret_key
AES_SECRET_KEY=32_character_secret_key_here
AES_IV=16_character_iv_here
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on:

**http://localhost:3000**

---

## 🧪 Testing Details

Unit tests are implemented using **Jest**

Tests validate:
- Encryption of Aadhaar/ID before database storage
- Correct decryption of encrypted Aadhaar/ID
- Detection of tampered encrypted data

Run tests using:

```bash
cd backend
npm test
```

---

## 🤖 AI Tool Usage Log (MANDATORY)

### AI-Assisted Tasks
- Generated AES-256 encryption and decryption utility functions
- Created JWT token validation middleware
- Generated Jest unit tests for encryption/decryption logic
- Assisted in frontend UI/UX enhancements and animations
- Helped debug CORS, environment configuration, and integration issues

### 📊 Effectiveness Score

**4 / 5**

**Justification:**
AI tools significantly reduced development time for security-related boilerplate code, encryption logic, and test generation. Manual validation and environment-specific debugging were still required.

---

## 📹 Demo Video

📎 (Add your demo / screen recording link here)

---

## ✅ Conclusion

This project demonstrates a secure and scalable user profile management system using stateless JWT authentication, encrypted storage of sensitive data, and a modern frontend dashboard.
The implementation strictly adheres to the assignment requirements and follows industry best practices for security, API design, and user experience.
