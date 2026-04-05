# 💰 Finance Dashboard System

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application for tracking financial records with a secure **Role-Based Access Control (RBAC)** system and a modern **Glassmorphism UI**.

---
## 🚀 Live Demo
  
- Frontend:   
- Backend API: 

---

## 📌 Overview

This application allows users to manage income and expenses while enforcing strict access control based on user roles. It is designed to simulate real-world financial systems with secure APIs and scalable architecture.

---

## ✨ Key Features

- 🔐 JWT Authentication (Login/Register)
- 🛡️ Role-Based Access Control (RBAC)
  - **Admin**: Full CRUD access + dashboard insights  
  - **Analyst**: Read access + financial summaries  
  - **Viewer**: Read-only access (no summaries)  
- 📊 Dynamic Dashboard
  - Total Income  
  - Total Expenses  
  - Net Balance  
- 📁 Transaction Management
  - Add / Edit / Delete financial records (Admin only)  
- ⚡ RESTful API Architecture
- 🎨 Glassmorphism UI Design
- 🔄 Real-time updates on data changes  

---

## 🧠 System Design

### Role-Based Access Flow

- Backend middleware validates:
  - JWT token
  - User role permissions  
- Frontend conditionally renders UI based on role

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Lucide React (Icons)
- CSS (Glassmorphism + Variables)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)

---

## 📂 Project Structure

```bash
finance-dashboard-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx

## 🔐 Role Permissions

| Role     | Access Level | Capabilities |
|----------|-------------|-------------|
| Admin    | Full Access | Create, Read, Update, Delete records + view summaries |
| Analyst  | Medium      | View records + dashboard analytics |
| Viewer   | Limited     | View records only |

---

## 📊 Data Models

### User
```json
{
  "name": "string",
  "email": "string",
  "password": "hashed",
  "role": "Admin | Analyst | Viewer"
}
### Records
```json
{
  "type": "income | expense",
  "amount": "number",
  "category": "string",
  "date": "date"
}

## 🔗 API Endpoints
### Authentication (`/api/users`)
```http
POST /api/users/register
POST /api/users/login
### Dashboard
```http
GET /api/dashboard/summary   (Admin, Analyst only)
### Records
```http
GET    /api/records      (All roles)
POST   /api/records      (Admin only)
PUT    /api/records/:id  (Admin only)
DELETE /api/records/:id  (Admin only)

## ⚙️ Local Setup

Follow these steps to run the project locally on your system.

---

### 1) Clone the Repository

```bash
git clone https://github.com/shilendra-23501a05f8/Finance_Dashboard.git
cd Finance_Dashboard

### 2) Backend Setup
```bash
cd backend
npm install

Create a .env file inside the backend folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

To run:-
npm run start

### 3)Frontend Setup
```bash
cd frontend
npm install
npm run dev
