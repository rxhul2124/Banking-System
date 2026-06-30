# SkyBank - Full-Stack Modern Fintech Dashboard

SkyBank is a secure, modern fintech web application that simulates bank ledger transactions. It features a high-fidelity glassmorphic dashboard, real-time balance updates, persistent dark/light themes, fund transfers with idempotency protection, and an administrative fund allocation console.

---

## 🚀 Key Features

### 🔒 Secure Authentication
- Cookie-based JSON Web Token (JWT) session security.
- Token blacklisting on logout to prevent replay attacks.
- Protected Route wrappers for dashboard safety.
- Persistent session retention on page refresh.

### 💼 Personal Banking
- **Dashboard**: High-fidelity overview cards detailing primary balances, account information, and live transaction statements.
- **Transfers**: Safe fund transfers to other accounts with built-in checks (insufficient balance, self-transfers, invalid account formats).
- **Idempotency Protection**: Client-generated transaction tokens (UUIDv4) to guarantee zero double-charging on duplicate network calls.
- **Invoice Receipts**: Sleek modal receipt popups showing complete metadata details on transaction completion.

### 🛠️ Fund Management (Admin Panel)
- **Interactive User list**: Table view of system users showing status, registration date, and individual account details.
- **Search Filtering**: Filter accounts dynamically by Name, Email address, or Account ID.
- **Fund Allocation**: Directly credit funds to any chosen user account (e.g. system deposits).
- **Compliance Log**: Warning notices informing admins that all actions are archived for security compliance.

### 🎨 Premium UI/UX Design
- Glassmorphic card styling.
- Responsive, fixed sidebar sidebar layout (desktop remains fixed while only content scrolls).
- Persistent theme preferences (retains dark/light mode across page reloads using browser local storage).

---

## 📁 Project Architecture

```
Banking-System/
├── backend/                  # Node.js + Express API server
│   ├── src/
│   │   ├── controller/      # API Request handlers
│   │   ├── middleware/      # Auth validations & System user checks
│   │   ├── models/          # Mongoose DB Schemas (User, Account, Transaction, Ledger)
│   │   └── routes/          # Express route bindings
│   └── server.js            # App entry point
│
└── frontend/                 # React + Vite application
    ├── src/
    │   ├── features/
    │   │   ├── auth/        # Auth Context, login/register pages
    │   │   ├── account/     # Dashboard, profile pages, table components
    │   │   ├── transfer/    # Transfer form page & hooks
    │   │   └── admin/       # Admin console page, context, hooks
    │   ├── style/           # SASS theme configs & global button modules
    │   └── App.jsx          # Providers nesting & routes mounting
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16.0 or higher)
- **MongoDB** (Cloud Atlas URL or Local server instance)

---

### Step 1: Backend Setup
1. Navigate into the backend folder:
   ```bash
   cd backend
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

---

### Step 2: Frontend Setup
1. Navigate into the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the frontend client (Vite server):
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173`.

---

## 🔒 Security & Database Compliance
SkyBank uses a double-entry ledger database model. Credits and debits are treated as separate ledger documents tied to a master transaction ID. All updates are wrapped inside a **Mongoose Database Session Transaction** to ensure atomicity (if a debit fails, the credit is automatically rolled back, protecting against database corruption).
