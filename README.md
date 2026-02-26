# Task Manager Client – React + Vite + Tailwind

![React](https://img.shields.io/badge/React-Frontend-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38bdf8)
![JWT](https://img.shields.io/badge/Auth-Cookie--Based-orange)

---

## Overview

This project is the **frontend client** for the Task Management API, built using **React (Vite)** and **TailwindCSS**.

It provides a minimal yet functional user interface to demonstrate authentication flow, protected routes, and CRUD operations powered by the backend REST API.

The focus of this frontend is **API integration and authentication workflow**, rather than complex UI design.

---

## Features

* User Registration & Login
* Cookie-based JWT Authentication
* Dynamic Navbar (Auth-aware UI)
* Protected Routes
* Task CRUD Operations
* Session persistence on refresh
* Fast development with Vite
* TailwindCSS styling

---

## Application Flow

```id="flow001"
User Login/Register
        ↓
Backend Authentication
        ↓
JWT Cookies Stored
        ↓
Protected Dashboard Access
        ↓
Task CRUD Operations
```

---

## 📂 Project Structure

```id="struct001"
frontend/
│
├── src/
│   ├── api/
│   │     └── axios.js
│   │
│   ├── components/
│   │     ├── Navbar.jsx
│   │     └── TaskCard.jsx
│   │
│   ├── context/
│   │     └── AuthContext.jsx
│   │
│   ├── layouts/
│   │     └── MainLayout.jsx
│   │
│   ├── pages/
│   │     ├── Login.jsx
│   │     ├── Register.jsx
│   │     └── Dashboard.jsx
│   │
│   ├── routes/
│   │     ├── ProtectedRoute.jsx
│   │     └── PublicRoute.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

## ⚙️ Tech Stack

### Core

* React (Vite)
* React Router DOM
* Axios

### Styling

* TailwindCSS

### State Management

* React Context API

---

## 🔐 Authentication Strategy

The application uses **cookie-based JWT authentication**:

| Token         | Purpose           | Storage          |
| ------------- | ----------------- | ---------------- |
| Access Token  | API authorization | HTTP-only Cookie |
| Refresh Token | Session renewal   | HTTP-only Cookie |

Frontend communicates with backend using:

```id="axios001"
withCredentials: true
```

to securely send cookies.

---

## Routing Architecture

* **PublicRoute**

  * Login
  * Register

* **ProtectedRoute**

  * Dashboard (requires authentication)

Unauthorized users are automatically redirected to login.

---

## 🌐 API Configuration

API requests are configured in:

```
src/api/axios.js
```

Example:

```js id="axios002"
const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});
```

---

## ▶️ Installation & Setup

### 1️⃣ Install Dependencies

```bash id="setup001"
npm install
```

### 2️⃣ Start Development Server

```bash id="setup002"
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 Backend Requirement

This frontend requires the backend API to be running:

```
http://localhost:4000
```

Make sure backend CORS allows:

```
http://localhost:5173
```

---

## 🛡 Security Practices

* HTTP-only cookies prevent XSS token access
* Protected routes prevent unauthorized navigation
* Automatic session validation via `/auth/me`
* Secure logout clears authentication cookies

---

## Future Improvements

* Form validation with React Hook Form
* Global API error interceptor
* Loading skeletons
* Toast notifications
* Dark mode UI
* Deployment configuration

---

## Testing

You can test the flow:

1. Register a user
2. Login
3. Access dashboard
4. Create/Delete tasks
5. Refresh page (session persists)
6. Logout

---

##  Author

**Aman Kumar**
MERN Stack Developer

---

##  License

Created for evaluation and educational purposes.
