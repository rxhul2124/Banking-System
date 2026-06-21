const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controller/account.controller")

const accountRouter = Router();


/**
 * @route POST /api/accounts/
 * @description create a new account
 * @access private
 */

accountRouter.post("/", authMiddleware.authMiddleware, accountController.createAccountController)

/**
 * @route GET /api/accounts/
 * @description get account details of the logged in user
 * @access private
 */

accountRouter.get("/", authMiddleware.authMiddleware, accountController.getUserAccountController)

/**
 * @route GET /api/accounts/balance/:accountId
 * @description get account balance of a specific account
 * @access private
 */

accountRouter.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = accountRouter