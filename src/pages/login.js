import * as React from "react"
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles"
import Sheet from "@mui/joy/Sheet"
import CssBaseline from "@mui/joy/CssBaseline"
import Typography from "@mui/joy/Typography"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Button from "@mui/joy/Button"
import Link from "@mui/joy/Link"

import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../constants"

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <Button variant='soft'>Change mode</Button>
  }

  return (
    <Select
      variant='soft'
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode)
      }}
      sx={{ width: "max-content" }}
    >
      <Option value='system'>System</Option>
      <Option value='light'>Light</Option>
      <Option value='dark'>Dark</Option>
    </Select>
  )
}

export default function LoginFinal(props) {
  const navigate = useNavigate()

  // toggle between login and register view
  const [isRegister, setIsRegister] = React.useState(false)

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  // Error state for password mismatch
  const [passwordError, setPasswordError] = React.useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        alert("Login successful!")
        navigate("/") // redirect after login
      } else {
        alert("Login failed: " + data.error)
      }
    } catch (err) {
      alert("Request error: " + err.message)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    setPasswordError("")

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Registration successful! You can now log in.")
        setIsRegister(false)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } else {
        alert("Registration failed: " + data.error)
      }
    } catch (err) {
      alert("Request error: " + err.message)
    }
  }

  return (
    <main>
      <CssVarsProvider {...props}>
        <ModeToggle />
        <CssBaseline />
        <Sheet
          sx={{
            width: 350,
            mx: "auto",
            my: 8,
            py: 5,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant='outlined'
        >
          <div>
            <Typography level='h4' component='h1'>
              <b>{isRegister ? "Create an account" : "Welcome!"}</b>
            </Typography>
            <Typography level='body-sm'>
              {isRegister ? "Sign up to get started." : "Sign in to continue."}
            </Typography>
          </div>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name='email'
              type='email'
              placeholder='Please enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name='password'
              type='password'
              placeholder='Please enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          {isRegister && (
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name='confirmPassword'
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={Boolean(passwordError)}
                aria-describedby='confirm-password-error'
              />
              {passwordError && (
                <Typography
                  id='confirm-password-error'
                  level='body-xs'
                  color='danger'
                  sx={{ mt: 0.5 }}
                >
                  {passwordError}
                </Typography>
              )}
            </FormControl>
          )}

          <Button
            onClick={isRegister ? handleRegister : handleLogin}
            sx={{ mt: 1 }}
          >
            {isRegister ? "Register" : "Log in"}
          </Button>

          <Typography
            endDecorator={
              <Link
                component='button'
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Log in" : "Sign up"}
              </Link>
            }
            sx={{ fontSize: "sm", alignSelf: "center" }}
          >
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  )
}
