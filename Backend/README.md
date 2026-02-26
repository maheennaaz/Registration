# Backend Application (Node.js + Express + MySQL)

This is a backend application for user registration and login, using MySQL for storage, bcrypt for password hashing, and JWT for authentication stored in HTTP-only cookies.

## Features
- **Registration**: POST `/register` - Accepts `username` and `password`. Hashed using bcrypt.
- **Login**: POST `/login` - Accepts `username` and `password`. Generates JWT and stores it in an HTTP-only cookie called `authToken`.
- **Database**: mysql2/promise with Aiven MySQL instance.
- **Security**: Password hashing (bcrypt), JWT authentication, HTTP-only cookies.

## Setup Steps

1. **Navigate to project folder**:
   ```bash
   cd Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory (already provided in this setup):
   ```env
   PORT=5000
   DB_HOST=mysql-f89360d-mohammadimaheen86-47c9.i.aivencloud.com
   DB_USER=avnadmin
   DB_PASSWORD=your_password
   DB_NAME=defaultdb
   DB_PORT=16614
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**:
   ```bash
   npm start
   ```
   *Note: `package.json` needs a start script. I will add it.*

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How to test

### Register
```bash
curl -X POST http://localhost:5000/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
```
Check for `Set-Cookie` header in the response.
