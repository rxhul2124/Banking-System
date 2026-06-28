const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const transactionController = require("../controller/transacation.controller")

const transactionRouter = Router();


/**
 * @route POST /api/transactions/ 
 * @description create a new transaction
 * @access  private
 */

transactionRouter.post("/", authMiddleware.authMiddleware, transactionController.createTransactionController)

/**
 * @route POST /api/transactions/initial-funds
 * @description create initial funds transaction from system user
 * @access private
 */

transactionRouter.post("/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransactionController)

/**
 * @route GET /api/transactions/history/:accountId
 * @description get transaction history of a specific account
 * @access private
 */

transactionRouter.get("/history/:accountId", authMiddleware.authMiddleware, transactionController.transactionHistoryController)

module.exports = transactionRouter