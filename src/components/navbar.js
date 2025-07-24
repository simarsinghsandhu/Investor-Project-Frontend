import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import { PAGES, ROUTES } from "../constants"
import { Navigate, useNavigate } from "react-router-dom"
import { Grid, useTheme } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { ThemeContext } from "../context/themeContext"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

function ResponsiveAppBar(props) {
  const theme = useTheme()
  const { toggleTheme } = React.useContext(ThemeContext)
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const token = localStorage.getItem("token")
  return token ? (
    <React.Fragment>
      <AppBar position='sticky' color='secondary'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ px: { xs: 1, md: 4 } }}>
            <AdbIcon
              sx={{
                mr: 1,
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {PAGES.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      navigate(ROUTES[page])
                      handleCloseNavMenu()
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {PAGES.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(ROUTES[page])
                    handleCloseNavMenu()
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton color='inherit' onClick={toggleTheme} sx={{ mr: 1 }}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeIcon color='inherit' />
                ) : (
                  <LightModeIcon color='inherit' />
                )}
              </IconButton>
              <Tooltip title='Open settings'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  size='large'
                >
                  <AccountCircleIcon fontSize='large' color='inherit' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token")
                    navigate(ROUTES.Login)
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth='lg' sx={{ paddingY: "20px" }}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Container>
    </React.Fragment>
  ) : (
    <Navigate to={ROUTES.Login} />
  )
}
export default ResponsiveAppBar
