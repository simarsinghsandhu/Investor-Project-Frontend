const TRANSACTIONS = "Transactions"
const REPORTS = "Reports"
const LOGIN = "Login"
const SUMMARY = "Portfolio"

export const PAGES = [SUMMARY, TRANSACTIONS, REPORTS]

export const ROUTES = {
  [SUMMARY]: "/summary",
  [LOGIN]: "/login",
  [TRANSACTIONS]: "/transactions-list",
  [REPORTS]: "/reports",
}

export const STOCKS = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT", "NFLX", "META"]

export const API_URL = `${process.env.REACT_APP_API_URL}/api`
