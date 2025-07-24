import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import Transactions from "./pages/transactions"
import Login from "./pages/login"
import Reports from "./pages/reports"
import Summary from "./pages/summary"
import Navbar from "./components/navbar"
import { ROUTES } from "./constants"
import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Navigate to={ROUTES.Portfolio} />} />

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
      <ToastContainer
        position='top-right'
        autoClose={3000} // auto close after 3 seconds
        hideProgressBar
        newestOnTop={false}
        closeOnClick // enable closing on click
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        transition={Zoom}
      />
    </>
  )
}

export default App
