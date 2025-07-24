import { useEffect, useState } from "react"
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material"
import { API_URL } from "../constants"

const Summary = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/portfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch portfolio")
      }

      const data = await res.json()
      setPortfolio(data)
    } catch (err) {
      console.error(err)
      setError("Something went wrong fetching portfolio data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  if (loading) {
    return (
      <Grid container justifyContent='center' mt={4}>
        <CircularProgress color='secondary' />
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container justifyContent='center' mt={4}>
        <Alert severity='error'>{error}</Alert>
      </Grid>
    )
  }

  if (!portfolio) return null

  const { user, summary, totalInvestment } = portfolio

  return (
    <Grid container spacing={4} direction='column'>
      <Grid size={12}>
        <Typography variant='h4' color='secondary' gutterBottom>
          Portfolio Summary
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          User: {user.email}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant='h6' color='secondary'>
              Total Investment:
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              ${totalInvestment.toFixed(2)} CAD
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Typography variant='h6' color='secondary' gutterBottom>
          Investments by Stock
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(summary).length === 0 ? (
            <Typography>No investments yet.</Typography>
          ) : (
            Object.entries(summary).map(([stock, amount], index) => (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                <Card
                  key={stock}
                  sx={{
                    mb: 2,
                  }}
                  elevation={4}
                >
                  <CardContent>
                    <Typography variant='subtitle1' color='secondary'>
                      {stock}
                    </Typography>
                    <Typography fontWeight='bold'>
                      ${amount.toFixed(2)} CAD
                    </Typography>
                  </CardContent>
                  {index !== Object.entries(summary).length - 1 && <Divider />}
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Summary
