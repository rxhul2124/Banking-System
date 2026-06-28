import { useContext, useState } from "react"
import { AccountContext } from "../account.context"
import { getUserAccount, getUserBalance, createUserAccount, getUserAccountHistory } from "../services/account.api"

export const useAccount = () => {
    const accountContext = useContext(AccountContext)

    if (!accountContext) {
        throw new Error("useAccount must be used within the AccountProvider")
    }

    const { account, setAccount, accountBalance, setAccountBalance, accountHistory, setAccountHistory } = accountContext
    const [accountLoading, setAccountLoading] = useState(false)

    /**
     * @description create a new account for the user   
     */

    const handleCreateAccount = async () => {
        setAccountLoading(true)
        try {
            const response = await createUserAccount();
            setAccount(response.accounts[0])
        } finally {
            setAccountLoading(false)
        }
    }

    /**
     * @description get the account details of the logged in user
     */

    const handleGetAccount = async () => {
        setAccountLoading(true)
        try {
            const response = await getUserAccount();
            setAccount(response.accounts[0]);
        } finally {
            setAccountLoading(false)
        }
    }

    /**
     * @description get the account balance of the logged in user
     */

    const handleGetUserBalance = async (accountId) => {
        setAccountLoading(true)
        try {
            const response = await getUserBalance(accountId)
            setAccountBalance(response.balance)
        } finally {
            setAccountLoading(false)
        }
    }

    /**
     * @description get the account history of the logged in user
     */

    const handleGetUserAccountHistory = async (accountId) => {
        setAccountLoading(true)

        try {
            const response = await getUserAccountHistory(accountId)
            setAccountHistory(response.ledgers);
        } finally {
            setAccountLoading(false)
        }
    }

    return { account, accountBalance, accountLoading, handleGetAccount, accountHistory, handleGetUserBalance, handleCreateAccount, handleGetUserAccountHistory }

}