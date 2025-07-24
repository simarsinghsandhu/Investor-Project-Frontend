import { useEffect, useLayoutEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { API_URL, STOCKS } from "../constants"
import { toast } from "react-toastify"
import { LoadingButton } from "@mui/lab"

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

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState("create")
  const [formData, setFormData] = useState({
    stock: "",
    date: "",
    type: "deposit",
    amount: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const openMenu = Boolean(anchorEl)

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

  useEffect(() => {
    document.title = "Investor Dashboard: Transaction"
  }, [])

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line
  }, [paginationModel])

  useLayoutEffect(() => {
    if (isMobile && paginationModel.pageSize !== 10) {
      setPaginationModel({ page: 0, pageSize: 10 })
    }
    // eslint-disable-next-line
  }, [isMobile])

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleDelete = async () => {
    handleMenuClose()

    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${API_URL}/transactions/${selectedRow.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Delete failed")

      toast.success("Transaction deleted successfully")
      fetchTransactions()
    } catch (err) {
      toast.error("Error deleting transaction")
      console.error(err)
    }
  }

  const handleEdit = () => {
    setFormData(selectedRow)
    setDialogMode("edit")
    setDialogOpen(true)
    handleMenuClose()
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setFormData({ stock: "", date: "", type: "deposit", amount: "" })
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddClick = () => {
    setFormData({
      stock: STOCKS[0], // auto-select first stock
      date: new Date().toISOString().slice(0, 16), // current datetime (local input format)
      type: "deposit",
      amount: 0,
    })
    setDialogMode("add")
    setDialogOpen(true)
  }

  const handleFormSubmit = async () => {
    setIsSubmitting(true)

    const token = localStorage.getItem("token")
    const method = dialogMode === "edit" ? "PUT" : "POST"
    const url =
      dialogMode === "edit"
        ? `${API_URL}/transactions/${formData.id}`
        : `${API_URL}/transactions`

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save transaction")

      toast.success(
        dialogMode === "edit"
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      )

      handleDialogClose()
      fetchTransactions()
    } catch (err) {
      toast.error("Error saving transaction")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

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
    {
      field: "actions",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleMenuClick(e, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  return (
    <Grid container flexDirection='column'>
      <Typography variant='h4' color='secondary' gutterBottom>
        Transactions
      </Typography>

      <Grid alignSelf={"end"} mb={2}>
        <Button variant='contained' color='secondary' onClick={handleAddClick}>
          Add Transaction
        </Button>
      </Grid>

      {isMobile ? (
        <Grid container spacing={2}>
          {transactions.map((t) => (
            <Grid size={{ xs: 12, sm: 6 }} key={t.id}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Typography variant='h6' color='secondary'>
                      {t.stock}
                    </Typography>
                    <IconButton onClick={(e) => handleMenuClick(e, t)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                  <Typography variant='body2'>
                    {new Date(t.date).toLocaleString()}
                  </Typography>
                  <Typography
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
                  setPaginationModel((prev) => ({ ...prev, page: newPage - 1 }))
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

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>
          {dialogMode === "edit" ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin='normal'>
            <InputLabel id='stock-label'>Stock</InputLabel>
            <Select
              labelId='stock-label'
              name='stock'
              value={formData.stock}
              label='Stock'
              onChange={handleFormChange}
            >
              {STOCKS.map((symbol) => (
                <MenuItem key={symbol} value={symbol}>
                  {symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                maxDate={new Date()}
                label='Date'
                value={formData.date ? new Date(formData.date) : null}
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    date: newValue ? newValue.toISOString() : "",
                  }))
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin='normal' />
                )}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel id='type-label'>Transaction Type</InputLabel>
            <Select
              labelId='type-label'
              name='type'
              value={formData.type}
              label='Transaction Type'
              onChange={handleFormChange}
            >
              <MenuItem value='deposit'>Deposit</MenuItem>
              <MenuItem value='withdraw'>Withdraw</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin='normal'
            label='Amount'
            name='amount'
            type='number'
            value={formData.amount}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <LoadingButton
            onClick={handleFormSubmit}
            variant='contained'
            color='secondary'
            loading={isSubmitting}
            disabled={
              dialogMode !== "edit" &&
              (!formData.stock ||
                !formData.amount ||
                !formData.type ||
                !formData.date)
            }
          >
            {dialogMode === "edit" ? "Update" : "Add"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Transactions
