const { Router } = require("express")
const authController = require("../controller/auth.controller")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description register new user
 * @access public
 */

authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login user 
 * @access public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description logout user by clearing the token cookie and blacklisting the token
 * @access private
 */

authRouter.post("/logout", authController.logoutUserController)


module.exports = authRouter