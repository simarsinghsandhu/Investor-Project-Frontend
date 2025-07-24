import { useEffect, useState } from "react"
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
  Box,
  Paper,
} from "@mui/material"
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart"
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
    document.title = "Investor Dashboard: Portfolio"
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

  const stockData = Object.entries(summary).map(([stock, value]) => ({
    id: stock,
    value: value,
    label: stock,
  }))

  return (
    <Box>
      <Typography variant='h4' color='secondary' gutterBottom>
        Portfolio Summary
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' mb={2}>
        Welcome, {user.email}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={4}>
            <Grid size={12}>
              <Grid>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant='h6' color='secondary'>
                      Total Investment
                    </Typography>
                    <Typography
                      variant='h4'
                      fontWeight='bold'
                      color='text.primary'
                    >
                      ${totalInvestment.toFixed(2)} CAD
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6' color='secondary' gutterBottom>
                  Investment Distribution
                </Typography>
                <PieChart
                  series={[
                    {
                      data: stockData,
                      arcLabel: (item) => `$${item.value.toFixed(0)}`,
                    },
                  ]}
                  width={400}
                  height={300}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "#fff",
                      fontSize: 12,
                    },
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant='h6' color='secondary' gutterBottom>
            Individual Investments
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(summary).length === 0 ? (
              <Typography>No investments yet.</Typography>
            ) : (
              Object.entries(summary).map(([stock, amount], index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={stock}>
                  <Card elevation={4}>
                    <CardContent>
                      <Typography variant='subtitle1' color='secondary'>
                        {stock}
                      </Typography>
                      <Typography variant='h6' fontWeight='bold'>
                        ${amount.toFixed(2)} CAD
                      </Typography>
                    </CardContent>
                    {index !== Object.entries(summary).length - 1 && (
                      <Divider />
                    )}
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Summary
