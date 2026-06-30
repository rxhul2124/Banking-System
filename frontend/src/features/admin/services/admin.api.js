import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

export async function createInitialTransaction(toAccount, amount, idempotencyKey) {
    const response = await api.post("/api/transactions/initial-funds", {
        toAccount, amount, idempotencyKey
    })
    return response.data
}


export async function getAllUserAccounts() {
    const response = await api.get("/api/accounts/all")
    return response.data
}