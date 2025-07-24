# Investor Project Frontend

This is the **frontend application** for the Investor Project, built using **React.js** and **Material UI (MUI)**. The app allows users to register, log in, manage financial transactions, view portfolio summaries, access reports, and switch between light and dark themes. It is designed to be responsive and user-friendly across all devices.

🌐 **Live Demo**: [https://investor-project-frontend.vercel.app](https://investor-project-frontend.vercel.app)  
🔗 **Backend**: [https://investor-project-backend.onrender.com](https://investor-project-backend.onrender.com)  
📦 **GitHub Repo**: [Investor Project Frontend](https://github.com/simarsinghsandhu/Investor-Project-Frontend)

---

## Features

### 🔐 Authentication

- User registration via `/api/register`
- User login via `/api/login`
- Auth token is stored securely and used in all protected API requests

### 📊 Portfolio Page

- Displays a summary of all transactions (deposits & withdrawals)
- Shows total investment and breakdown per stock
- Displays user email and a **Pie Chart** for visual summary

### 💼 Transactions Page

- Lists all user transactions with server-side pagination (DataGrid)
- Full **CRUD** operations:
  - ➕ Add transaction (form with default values and stock selector)
  - ✏️ Edit transaction
  - ❌ Delete transaction
- Responsive layout:
  - Desktop: Material UI DataGrid
  - Mobile: Card layout for better UX

### 📑 Reports Page

- Displays available financial reports as cards
- Each card allows **PDF download** of a sample report

### 🎨 Theming

- Toggle between **Light** and **Dark** mode from the top navbar
- Theme preference is applied across all pages

### 📱 Responsive Design

- Fully responsive design with adaptive layouts using **Material UI's Grid system**
- Optimized for both desktop and mobile views

---

## Tech Stack

- **React.js**
- **Material UI (MUI v5)**
- **React Router DOM**
- **Axios**
- **JWT-based Auth (with localStorage)**
- **Chart.js** (for Pie chart visualization)
- **MUI DataGrid** (with server-side pagination)

---

## Environment Configuration

### For local development:

```
REACT_APP_API_URL=http://localhost:5000
```

### For production (already hosted):

```
REACT_APP_API_URL=https://investor-project-backend.onrender.com
```

---

## Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/simarsinghsandhu/Investor-Project-Frontend.git
cd Investor-Project-Frontend
```

2. **Install dependencies**

```
npm install
```

3. **Set environment variables**

Create a .env.local file and add the appropriate API URL.

4. **Start the development server**

```
npm start
```

5. **Open in browser at http://localhost:3000**

## Folder Structure

```bash
src/
├── api/               # Axios API setup
├── components/        # Reusable components (Navbar, Footer, Dialogs, etc.)
├── pages/             # Main page views (Login, Portfolio, Transactions, Reports)
├── context/           # Theme and Auth context
├── utils/             # Helper functions
└── App.js             # Routes and layout

```

## 📦 Future Improvements

- Add filtering/sorting to transactions
- Add user profile settings page
- Allow uploading and managing PDF reports

---

## 📄 License

MIT License © Simar Singh Sandhu

---

Feel free to open issues or contribute!
