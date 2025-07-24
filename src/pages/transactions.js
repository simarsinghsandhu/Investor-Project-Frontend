import { useEffect, useLayoutEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { API_URL } from "../constants"

const Transactions = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  const [rowCount, setRowCount] = useState(0)

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(
        `${API_URL}/transactions?page=${paginationModel.page + 1}&limit=${
          paginationModel.pageSize
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      setTransactions(data.transactions || [])
      setRowCount(data.total || 0)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch Transaction on update of page or pageSize
  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line
  }, [paginationModel])

  useLayoutEffect(() => {
    if (isMobile && paginationModel.pageSize !== 10) {
      setPaginationModel({
        page: 0,
        pageSize: 10,
      })
    }
    // eslint-disable-next-line
  }, [isMobile])

  const columns = [
    {
      field: "stock",
      headerName: "Stock",
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: false,
      valueFormatter: (value) => {
        const date = new Date(value)
        return date.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      },
    },
    {
      field: "type",
      headerName: "Transaction Type",
      width: 200,
      sortable: false,
      valueFormatter: (value) =>
        value === "deposit" ? "Deposited" : "Withdrawn",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      sortable: false,
      renderCell: (params) => {
        const isDeposit = params.row.type === "deposit"
        return (
          <Grid container height={"100%"} alignItems={"center"}>
            <Typography color={isDeposit ? "success" : "error"}>
              {isDeposit ? "+" : "–"}${parseFloat(params.value).toFixed(2)} CAD
            </Typography>
          </Grid>
        )
      },
    },
  ]

  return (
    <Grid container flexDirection='column'>
      <Typography variant='h4' color='secondary' gutterBottom>
        Transactions
      </Typography>

      {isMobile ? (
        <Grid container spacing={2}>
          {transactions.map((t) => (
            <Grid size={{ xs: 12, sm: 6 }} key={t.id}>
              <Card>
                <CardContent>
                  <Typography variant='h6' color='secondary'>
                    {t.stock}
                  </Typography>
                  <Typography variant='body2'>
                    {new Date(t.date).toLocaleString()}
                  </Typography>
                  <Typography
                    variant='body2'
                    color={t.type === "deposit" ? "success" : "error"}
                  >
                    {t.type === "deposit" ? "Deposited" : "Withdrawn"}: $
                    {parseFloat(t.amount).toFixed(2)} CAD
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid size={12} mt={3}>
            <Grid container justifyContent='end'>
              <Pagination
                count={Math.ceil(rowCount / paginationModel.pageSize)}
                page={paginationModel.page + 1}
                onChange={(e, newPage) =>
                  setPaginationModel((prev) => ({
                    ...prev,
                    page: newPage - 1,
                  }))
                }
                color='secondary'
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            rowHeight={50}
            paginationMode='server'
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={rowCount}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row.id}
            loading={loading}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "secondary.light",
                color: "secondary.main",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      )}
    </Grid>
  )
}

export default Transactions
