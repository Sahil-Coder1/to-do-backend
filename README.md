# 🛠️ Backend – MERN TODO App

A secure and RESTful backend server built using **Node.js**, **Express**, and **MongoDB** to support authentication and task management functionalities in the MERN TODO Application.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** – for Authentication
- **bcryptjs** – for Password Hashing
- **cookie-parser** – for handling HTTP-only cookies
- **dotenv** – for managing environment variables
- **cors** – to enable cross-origin requests

---

## 🔐 Features

- ✅ User Signup and Login (JWT-based auth)
- ✅ HTTP-only Cookie for secure token storage
- ✅ Protected routes using middleware
- ✅ CRUD operations for TODOs
- ✅ Modular route and controller structure

---

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following keys:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-db-uri>
JWT_SECRET=your_jwt_secret_key
```

---

## 📡 API Endpoints

## 🌐 Base URL

```
http://localhost:5000/api
```

## 🧑‍💼 Auth Routes (`/auth`)

### POST `/register`

- Registers a new user.
- **Body:** `{ username, email, password }`

### POST `/login`

- Logs in a user.
- **Body:** `{ email, password }`

---

## 📝 TODO Routes (`/todos`)

### GET `/:id`

- Fetch all TODOs for given user id.

### POST `/`

- Create a TODO.
- **Body:** `{ title,description, completed,user }`

### PUT `/:id`

- Update TODO by ID.
- **Body:** `{ title, completed,dscription }`

### DELETE `/:id`

- Delete TODO by ID.

---

## 🔐 Auth

- JWT stored in HTTP-only cookies.
- Secure with `httpOnly`, `secure`, `sameSite: 'Strict'`.

---

## ✅ Response Format

```json
{
  "user": { ... },
  "token": "...",
  "todos": [ ... ],
  "msg": "optional"
}
```
