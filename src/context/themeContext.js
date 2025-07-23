import { createContext, useMemo, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", newMode)
      return newMode
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiButton: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiTextField: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiCheckbox: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiSwitch: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiRadio: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiSlider: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiLinearProgress: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiCircularProgress: {
            defaultProps: {
              color: "secondary",
            },
          },
          MuiPaginationItem: {
            defaultProps: {
              color: "secondary",
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
