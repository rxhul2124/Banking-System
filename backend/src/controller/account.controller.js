const accountModel = require("../models/account.model")

/**
 * @name createAccountController
 * @description controller to create a new account for the logged in user
 * @access private
 */

async function createAccountController(req, res) {
    const user = req.user

    if (!user) {
        res.status(401).json({
            message: "User doesn't exists"
        })
    }

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        message: "Account created successfully",
        account
    })

}

/**
 * @name getUserAccountController
 * @description controller to get account details of the logged in user
 * @access private
 */

async function getUserAccountController(req, res) {
    const accounts = await accountModel.find({ user: req.user._id });

    res.status(200).json({
        accounts
    })
}

/**
 * @name getAccountBalanceController
 * @description controller to get account balance of a specific account
 * @access private
 */

async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }


    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}


module.exports = {
    createAccountController,
    getUserAccountController,
    getAccountBalanceController
}