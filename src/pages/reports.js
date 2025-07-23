import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import { API_URL } from "../constants"
import { jsPDF } from "jspdf"

const REPORTS = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getReports = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setReports(data.reports)
      } catch (err) {
        console.error("Error fetching reports:", err)
      } finally {
        setLoading(false)
      }
    }

    getReports()
  }, [])

  if (loading) {
    return (
      <Grid container justifyContent='center' sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    )
  }

  const handleDownload = (report) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(report.name, 20, 20)
    doc.setFontSize(12)
    doc.text(`URL: ${report.url}`, 20, 35)
    doc.text(
      `Created At: ${new Date(report.created_at).toLocaleString()}`,
      20,
      50
    )

    doc.save(`${report.name.replace(/\s+/g, "_")}.pdf`)
  }

  return (
    <Grid container spacing={2}>
      {reports.length === 0 ? (
        <Typography variant='h6' color='textSecondary'>
          No reports available
        </Typography>
      ) : (
        reports.map((report, index) => (
          <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <Card
              elevation={4}
              sx={{
                borderLeft: "6px solid",
                borderColor: "secondary.main",
                backgroundColor: "background.paper",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant='h6' color='secondary' gutterBottom>
                  {report.name}
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Generated:{" "}
                  <Box component='span' fontWeight='medium'>
                    {new Date(report.created_at).toLocaleString()}
                  </Box>
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    wordBreak: "break-word",
                    fontStyle: "italic",
                  }}
                >
                  URL: {report.url}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(report)}
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default REPORTS
