import { useContext } from "react";
import { AdminContext } from "../admin.context";
import { createInitialTransaction, getAllUserAccounts } from "../services/admin.api";
import { v4 as uuidv4 } from "uuid";


export const useAdmin = () => {
    const context = useContext(AdminContext)

    if (!context) {
        throw new Error("useAdmin must be used within the AdminProvider")
    }

    const { adminLoading, setAdminLoading, allAccounts, setAllAccounts, depositData, setDepositData } = context


    const handleCreateInitialTransaction = async (toAccount, amount) => {
        setAdminLoading(true)
        try {
            const idempotencyKey = uuidv4()
            const response = await createInitialTransaction(toAccount, amount, idempotencyKey)
            setDepositData(response)
            return response
        } finally {
            setAdminLoading(false)
        }
    }

    const handleGetAllUserAccounts = async () => {
        setAdminLoading(true)
        try {
            const response = await getAllUserAccounts()
            setAllAccounts(response.accounts)
        } finally {
            setAdminLoading(false)
        }
    }


    return { adminLoading, handleCreateInitialTransaction, handleGetAllUserAccounts, allAccounts, setAllAccounts, depositData, setDepositData }

}