const accountModel = require("../models/account.model")
const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const userModel = require("../models/user.model")
const mongoose = require("mongoose")

/**
 * @name createTransactionController
 * @description create new transaction, expect fromAccount, toAccount, amout, idempotency key
 * @access public
 */

async function createTransactionController(req, res) {

    //validate request

    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "fromAccount, toAccount, amount and idempotency key is required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })


    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })


    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    //validate idempotency key

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {

        if (isTransactionAlreadyExists.status === "COMPLETE")
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing"
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transacction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }


    // check account status

    if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    //Derive sender balance from ledger

    const balance = await fromUserAccount.getBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }


    //create transaction (PENDING)

    let transaction;

    try {

        const session = await mongoose.startSession()
        session.startTransaction()

        const createdTransactions = await transactionModel.create([{
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        }], { session })
        
        transaction = createdTransactions[0]


        const debitLedgerEntry = await ledgerModel.create([{
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], { session })

        const creditLedgerEntry = await ledgerModel.create([{
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], { session })

        transaction.status = "COMPLETE"
        await transactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETE" },
            { session }
        )

        await session.commitTransaction()
        session.endSession()
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            message: "Transaction is pending due to some issue, please retry after sometime",
        })
    }

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })
}


/**
 * @name createInitialFundsTransactionController
 * @description create initial funds transaction from system user
 * @access private
 */

async function createInitialFundsTransactionController(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotency key are required"
        })
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(toAccount)) {
        return res.status(400).json({
            message: "Invalid toAccount ID format"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: new mongoose.Types.ObjectId(toAccount)
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "toAccount doesn't exists"
        })
    }


    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "system user account not found"
        })
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })


    const debitLedgerEntry = await ledgerModel.create([{
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    }], { session })

    const creditLedgerEntry = await ledgerModel.create([{
        account: toUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    }], { session })

    transaction.status = "COMPLETE"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "Initial funds transaction  completed successfully",
        transaction: transaction
    })

}


/**
 * @name transactionHistoryController
 * @description controller to get transaction history of a specific account
 * @access private
 */

async function transactionHistoryController(req, res) {
    const { accountId } = req.params;

    const ledgers = await ledgerModel
        .find({ account: accountId })
        .populate({
            path: 'transaction',
            populate: [
                { path: 'fromAccount', populate: { path: 'user', select: 'name' } },
                { path: 'toAccount', populate: { path: 'user', select: 'name' } }
            ]
        })
        .sort({ _id: -1 })

    if (!ledgers) {
        return res.status(404).json({
            message: "No transaction history"
        })
    }

    res.status(200).json({
        ledgers
    })


}

module.exports = {
    createTransactionController,
    createInitialFundsTransactionController,
    transactionHistoryController
}