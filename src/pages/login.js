import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Link,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import { LoadingButton } from "@mui/lab"

export default function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "Investor Dashboard: Login"
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.warning("Email is required!")
      return
    }
    if (!password) {
      toast.warning("Password is required!")
      return
    }
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        toast.success("Login successful!")
        navigate("/")
      } else {
        toast.error("Login failed: " + data.error)
      }
    } catch (err) {
      toast.error("Request error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.warning("Email is required!")
      return
    }
    if (!password) {
      toast.warning("Password is required!")
      return
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      toast.warning("Passwords do not match")
      return
    }
    setPasswordError("")

    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Registration successful! You can now log in.")
        setIsRegister(false)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } else {
        toast.error("Registration failed: " + data.error)
      }
    } catch (err) {
      toast.error("Request error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #8a23f7ff, #8d296dff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 2,
          borderLeft: "none",
        }}
        elevation={6}
      >
        <CardContent>
          <Typography
            variant='h4'
            color='secondary'
            align='center'
            fontWeight={700}
            gutterBottom
          >
            Investor Dashboard
          </Typography>

          <Typography variant='body1' align='center' gutterBottom>
            {isRegister
              ? "Sign up to manage your investments."
              : "Log in to view your dashboard."}
          </Typography>

          <Box
            component='form'
            noValidate
            onSubmit={isRegister ? handleRegister : handleLogin}
          >
            <TextField
              label='Email'
              type='email'
              fullWidth
              required
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant='outlined'
            />

            <TextField
              label='Password'
              type='password'
              fullWidth
              required
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
            />

            {isRegister && (
              <TextField
                label='Confirm Password'
                type='password'
                fullWidth
                required
                margin='normal'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
                variant='outlined'
              />
            )}

            <LoadingButton
              type='submit'
              variant='contained'
              color='secondary'
              fullWidth
              sx={{ mt: 2 }}
              loading={loading}
            >
              {isRegister ? "Register" : "Login"}
            </LoadingButton>
          </Box>

          <Typography variant='body2' align='center' sx={{ mt: 2 }}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link component='button' onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Log In" : "Register"}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
