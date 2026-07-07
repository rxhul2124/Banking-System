import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true,
})


export async function handleTransfer(fromAccount, toAccount, amount, idempotencyKey) {
    try {
        const response = await api.post("/api/transactions", {
            fromAccount,
            toAccount,
            amount,
            idempotencyKey
        });
        return response.data;
    } catch (error) {
        console.error("Error occurred while handling transfer:", error);
        throw error;
    }
}