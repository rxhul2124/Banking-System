# 🏦 SkyBank - Full-Stack Modern Fintech Dashboard

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SCSS](https://img.shields.io/badge/Sass-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

SkyBank is a secure, premium full-stack fintech web application simulating bank ledger transactions. It features a high-fidelity dashboard, real-time balance checks, persistent dark/light themes, fund transfers with idempotency protection, and an administrative console.

---

## 🛠️ Key Learning Milestones

Building this project was a huge step forward in my software development journey. Here are the core concepts I learned and implemented:

*   **🔒 Secure Cross-Site JWT Authentication**: Developed a robust cookie-based JWT login system. To deploy on separate platforms (Vercel for frontend & Render for backend), I learned to configure secure cross-site cookies with `secure: true`, `httpOnly: true`, and `sameSite: "none"`.
*   **💾 Relational MongoDB Queries using `.populate()`**: Implemented Mongoose `.populate()` chains to handle relational data (e.g. linking ledger records to sender/recipient account documents and user details) and return comprehensive transaction logs.
*   **🎨 Advanced SCSS & Responsive Rail Navigation**: Structured modular stylesheets using nesting, variables, and mixins. Designed a responsive layout that dynamically collapses the full sidebar into a compact 60px icon rail with hover tooltips on mobile screens.
*   **📂 Feature-Based Folder Architecture**: Shuffled from a standard MVC folder structure to a feature-based modular layout (grouping files by domains like `auth`, `account`, `transfer`, and `admin`). This keeps the codebase maintainable, readable, and ready to scale.

---

## 🚀 Key Features

*   **Secure Authentication**: Fully protected client-side routes, JWT verification middleware on endpoints, and token blacklisting on logout.
*   **Personal Dashboard**: Beautiful cards detailing primary balances (with eye-toggle visibility), account information, and live statements.
*   **Safe Transfers**: Real-time transfers with validation checks (insufficient balance, self-transfers, format validations).
*   **Double-Charge Protection**: Client-generated transaction tokens (UUIDv4) sent as idempotency keys to ensure duplicate network calls never double-debit an account.
*   **Admin Console**: Interactive user directories, dynamically filterable accounts (by Name, Email, or Account ID), and direct fund allocations.

---

## 📁 Project Architecture

```text
Banking-System/
├── backend/                  # Node.js + Express API server
│   ├── src/
│   │   ├── controller/      # API handlers (auth, account, transaction)
│   │   ├── middleware/      # Authentication & admin verification
│   │   ├── models/          # Schemas (User, Account, Transaction, Ledger)
│   │   └── routes/          # Express route declarations
│   └── server.js            # Entry point
│
└── frontend/                 # React + Vite client app
    ├── src/
    │   ├── features/
    │   │   ├── auth/        # Context, login, and registration pages
    │   │   ├── account/     # Dashboard, profile, and table components
    │   │   ├── transfer/    # Transfer execution form & hooks
    │   │   └── admin/       # Management console, context, and hooks
    │   ├── style/           # SCSS styles, colors, and reusable button designs
    │   └── App.jsx          # Providers & routes tree
```

---

## ⚙️ Installation & Local Setup

### Step 1: Backend Configuration
1. Navigate into the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_jwt_sign_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### Step 2: Frontend Configuration
1. Navigate into the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛡️ Database & Security Compliance
SkyBank runs on a **double-entry ledger database model**. Credits and debits are stored as distinct ledger entries referencing a unique master transaction ID. To prevent data inconsistency, operations are executed inside a **Mongoose Database Session Transaction**—ensuring that if a credit fails, the debit is completely rolled back (Atomicity).
