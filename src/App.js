import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import Transactions from "./pages/transactions"
import Login from "./pages/login"
import Reports from "./pages/reports"
import Summary from "./pages/summary"
import Navbar from "./components/navbar"
import { ROUTES } from "./constants"

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={ROUTES.Transactions} />} />

      <Route path={ROUTES.Login} element={<Login />} />

      <Route
        path={ROUTES.Portfolio}
        element={
          <Navbar>
            <Summary />
          </Navbar>
        }
      />

      <Route
        path={ROUTES.Transactions}
        element={
          <Navbar>
            <Transactions />
          </Navbar>
        }
      />

      <Route
        path={ROUTES.Reports}
        element={
          <Navbar>
            <Reports />
          </Navbar>
        }
      />
    </Routes>
  )
}

export default App
