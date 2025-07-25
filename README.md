# Investor Project Frontend

This is the **frontend application** for the Investor Project, built using **React.js** and **Material UI (MUI)**. The app allows users to register, log in, manage financial transactions, view portfolio summaries, access reports, and switch between light and dark themes. It is designed to be responsive and user-friendly across all devices.

🌐 **Live Demo**: [https://investor-project-frontend.vercel.app](https://investor-project-frontend.vercel.app)  
🔗 **Backend**: [https://investor-project-backend.onrender.com](https://investor-project-backend.onrender.com)  
📦 **GitHub Repo**: [Investor Project Frontend](https://github.com/simarsinghsandhu/Investor-Project-Frontend)

---

## Features

### 🔐 Login Page
- User can signup or login through this page.
- User registration via `/register` API
- User login via `/login` API
- Auth token is stored securely and used in all protected API requests
<p>
  <img src="https://github.com/user-attachments/assets/5b829b0b-7aa7-49e0-9dcd-df0117f36f68" width="79%" alt="image" />
  <img src="https://github.com/user-attachments/assets/e963e20a-504f-4beb-8a56-af34a6c914b0" width="19%" alt="image" />
</p>

### 📊 Portfolio Page
- Displays a summary of all transactions (deposits & withdrawals) through a **Pie Chart**
- Shows total investment and breakdown per stock
- Displays user email of the authenticated user
<p>
  <img width="79%" alt="image" src="https://github.com/user-attachments/assets/a6c70f8b-0c78-4eea-a42d-d98faf124e1a" />
  <img width="19%" alt="image" src="https://github.com/user-attachments/assets/ea9ef0f9-46cc-4f19-a41f-45a48b5f23f7" />
</p>

### 💼 Transactions Page
- Lists all user transactions with server-side pagination (DataGrid)
- Full **CRUD** operations:
  - ➕ Add transaction (form with default values and stock selector)
  - ✏️ Edit transaction
  - ❌ Delete transaction
- Responsive layout:
  - Desktop: Material UI DataGrid
  - Mobile: Card layout for better UX
<p>
  <img width="79%" alt="image" src="https://github.com/user-attachments/assets/fbbf8bc9-1016-433b-a361-216eec6d3359" />
  <img width="19%" alt="image" src="https://github.com/user-attachments/assets/3c6cc9b6-e79f-4b04-9174-c43da4a4cb38" />
</p>

### 📑 Reports Page
- Displays available financial reports as cards
- Each card allows **PDF download** of a sample report
<p>
  <img width="79%" alt="image" src="https://github.com/user-attachments/assets/211b8ff7-1cc7-420c-9205-c842f8e04e4e" />
  <img width="19%" alt="image" src="https://github.com/user-attachments/assets/2cb17419-e74a-424d-b95c-bdb13b600ae0" />
</p>

### 🎨 Theming
- Toggle between **Light** and **Dark** mode from the top navbar
- Theme preference is applied across all pages
<img width="49%" alt="image" src="https://github.com/user-attachments/assets/d0edc0fe-e935-429c-a951-a098dab5e5b6" />
<img width="49%" alt="image" src="https://github.com/user-attachments/assets/267b3243-534c-4f53-be68-bf1027566a77" />

### 📱 Responsive Design
- Fully responsive design with adaptive layouts using **Material UI's Grid system**
- Optimized for both desktop and mobile views

---

## 🛠 Tech Stack

- **React.js**
- **Material UI (MUI v5)**
- **React Router DOM**
- **JWT-based Auth (with localStorage)**
- **Chart.js** (for Pie chart visualization)
- **MUI DataGrid** (with server-side pagination)

---

## ⚙️ Setup Instructions

### 1. **Clone the repo**
```bash
git clone https://github.com/simarsinghsandhu/Investor-Project-Frontend.git
cd Investor-Project-Frontend
```

### 2. **Install dependencies**
```
npm install
```

### 3. **Set environment variables**
Create a .env.local file and add the appropriate API URL.
#### For local development:
```
REACT_APP_API_URL=http://localhost:5000
```
#### For production (already hosted):
```
REACT_APP_API_URL=https://investor-project-backend.onrender.com
```

### 4. **Start the development server**
```
npm start
```

### 5. **Open in browser at http://localhost:3000**

---

## 📁 Folder Structure

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
