# 💰 Finance Dashboard System

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application for tracking financial records with a secure **Role-Based Access Control (RBAC)** system and a modern **Glassmorphism UI**.

---
## 🚀 Live Demo
  
- Frontend: https://finance-dashboard-gold-nu-97.vercel.app/login
- Backend API: https://finance-dashboard-1-1g4s.onrender.com/api

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
```
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
```
### Records
```json
{
  "type": "income | expense",
  "amount": "number",
  "category": "string",
  "date": "date"
}
```
## 🔗 API Endpoints
### Authentication (`/api/users`)
```http
POST /api/users/register
POST /api/users/login
```
### Dashboard
```http
GET /api/dashboard/summary   (Admin, Analyst only)
```
### Records
```http
GET    /api/records      (All roles)
POST   /api/records      (Admin only)
PUT    /api/records/:id  (Admin only)
DELETE /api/records/:id  (Admin only)
```
## 🔑 Demo Credentials

You can use the following demo accounts:

- Admin → admin@test.com  
- Analyst → analyst@test.com  
- Viewer → view@test.com  

Password for all: `123456`

## ⚙️ Local Setup

Follow these steps to run the project locally on your system.

---

### 1) Clone the Repository

```bash
git clone https://github.com/shilendra-23501a05f8/Finance_Dashboard.git
cd Finance_Dashboard
```
### 2) Backend Setup
```bash
cd backend
npm install
```
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
```
### 📸 Screenshots
Register:-
<img width="2879" height="1418" alt="image" src="https://github.com/user-attachments/assets/724d6e13-8ac7-40e1-9553-c796aff06a5b" />
Login:-
<img width="2877" height="1497" alt="image" src="https://github.com/user-attachments/assets/2d270fbf-0c7d-407f-a5f1-5844b28a405a" />
Admin:-
<img width="2879" height="1508" alt="image" src="https://github.com/user-attachments/assets/38c061c1-993c-438c-ae00-227a5f65d769" />
Analyst:-
<img width="2879" height="1488" alt="image" src="https://github.com/user-attachments/assets/57ed4d6b-6577-4ab4-85e2-ea778b56f1af" />
Viewer:-
<img width="2877" height="1458" alt="image" src="https://github.com/user-attachments/assets/c8c47a78-f3c0-4d72-b11a-ee2d22c2c693" />

### Author
Shilendra Narra
