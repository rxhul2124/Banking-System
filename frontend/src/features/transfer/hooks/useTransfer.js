import { useContext } from "react";
import { TransferContext } from "../transfer.context";
import { handleTransfer } from "../services/transfer.api";
import { v4 as uuidv4 } from "uuid";


export const useTransfer = () => {
    const context = useContext(TransferContext);

    if (!context) {
        throw new Error("useTransfer must be used within the TransferProvider");
    }

    const { transferData, setTransferData, transferLoading, setTransferLoading } = context


    const handleTransferSubmit = async (fromAccount, toAccount, amount) => {
        setTransferLoading(true)
        try {
            const idempotencyKey = uuidv4()
            const response = await handleTransfer(fromAccount, toAccount, amount, idempotencyKey)
            setTransferData(response)

            return response

        } finally {
            setTransferLoading(false)
        }

    }

    return { transferData, setTransferData, transferLoading, handleTransferSubmit }

}