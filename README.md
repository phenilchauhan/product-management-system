# 🧩 Product Management System

A full-stack web application built with **Angular 17 (Frontend)** and **Node.js + Express (Backend)** using **MySQL or PostgreSQL** as the database.

This system allows:
- ✅ User Registration & Login  
- 📦 Category & Product Management  
- 📤 Bulk Upload via CSV/XLSX  
- 📈 Product Report Generation  
- 🔐 JWT Authentication  
- 🎯 Angular Dashboard Interface

---

## 🧠 Tech Stack Overview

| Layer | Technology |
|--------|-------------|
| Frontend | Angular 17 |
| Styling | Bootstrap 5 |
| Backend | Node.js + Express |
| Database | MySQL / PostgreSQL |
| Authentication | JWT (JSON Web Token) |
| ORM / Query Builder | Sequelize / Knex |
| File Upload | Multer |
| Bulk Processing | fast-csv / ExcelJS |

---

## 📁 Project Structure


product-management-system/
│
├── frontend/ # Angular Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── pages/
│ │ │ │ ├── login/
│ │ │ │ ├── register/
│ │ │ │ └── dashboard/
│ │ │ ├── services/
│ │ │ │ └── auth.service.ts
│ │ │ └── app-routing.module.ts
│ │ └── environments/
│ └── package.json
│
└── backend/ # Node.js Backend
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── server.js
├── package.json
└── .env



---

## ⚙️ Backend Setup (Node.js + Express)

### 🧱 1️⃣ Navigate to Backend Folder
```bash
cd product-management-backend


npm install


Create a .env file in product-management-backend:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=product_management
DB_DIALECT=mysql
JWT_SECRET=your_secret_key

DB_DIALECT=postgres

Run Database Migration or Sync

npx sequelize-cli db:migrate

Start the Backend Server
npm run start

frontend

cd frontend

npm install 
Run Angular App
ng serve --open


👉 http://localhost:4200


| Method | Endpoint                    | Description                   |
| ------ | --------------------------- | ----------------------------- |
| `POST` | `/api/users/register`       | Register user                 |
| `POST` | `/api/users/login`          | User login                    |
| `GET`  | `/api/categories`           | Fetch all categories          |
| `POST` | `/api/categories`           | Create category               |
| `GET`  | `/api/products`             | List products                 |
| `POST` | `/api/products`             | Add product                   |
| `POST` | `/api/products/bulk-upload` | Upload products from CSV/XLSX |
| `GET`  | `/api/products/report`      | Generate report               |

