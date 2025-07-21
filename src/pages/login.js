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

  const [email, setEmail] = React.useState("admin")
  const [password, setPassword] = React.useState("password")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // 🔒 Fake Auth: In real apps, use an API call here
    if (email === "admin" && password === "password") {
      localStorage.setItem("token", "my-secret-token")
      navigate("/")
    } else {
      alert("Invalid credentials")
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
            mx: "auto", // margin left & right
            my: 8, // margin top & bottom
            py: 5, // padding top & bottom
            px: 2, // padding left & right
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
              <b>Welcome!</b>
            </Typography>
            <Typography level='body-sm'>Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name='email'
              type='email'
              placeholder='Please enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </FormControl>
          <Button onClick={handleSubmit} sx={{ mt: 1 }}>
            Log in
          </Button>
          <Typography
            endDecorator={<Link href='/sign-up'>Sign up</Link>}
            sx={{ fontSize: "sm", alignSelf: "center" }}
          >
            Don't have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  )
}
