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
