import { useContext, useState } from "react"
import { AccountContext } from "../account.context"
import { getUserAccount, getUserBalance } from "../services/account.api"

export const useAccount = () => {
    const accountContext = useContext(AccountContext)

    if (!accountContext) {
        throw new Error("useAccount must be used within the AccountProvider")
    }

    const { account, setAccount, accountBalance, setAccountBalance } = accountContext
    const [accountLoading, setAccountLoading] = useState(false)

    const handleGetAccount = async () => {
        setAccountLoading(true)
        try {
            const response = await getUserAccount();
            setAccount(response.accounts[0]);
        } finally {
            setAccountLoading(false)
        }
    }

    const handleGetUserBalance = async () => {
        setAccountLoading(true)
        try {
            const response = await getUserBalance(accountId)
            setAccountBalance(response)
            console.log(response)
        } finally {
            setAccountLoading(false)
        }
    }

    return { account, accountLoading, handleGetAccount, handleGetUserBalance }

}