import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Grid, Typography } from "@mui/material"
import { API_URL } from "../constants"

const Transactions = () => {
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

  const columns = [
    {
      field: "stock",
      headerName: "Stock",
      sortable: false,
      width: 250,
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
      width: 250,
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
    <Grid container flexDirection={"column"}>
      <Typography variant='h5' gutterBottom>
        Transactions
      </Typography>
      <DataGrid
        rows={transactions}
        columns={columns}
        rowHeight={50}
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowCount}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row.id}
        loading={loading}
        disableRowSelectionOnClick
      />
    </Grid>
  )
}

export default Transactions
