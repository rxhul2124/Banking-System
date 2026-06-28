import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true
})

/**
 * @name createUserAccount
 * @description create a new account for the logged in user
 * @access private
 */

export async function createUserAccount() {
    const response = await api.post("/api/accounts/")

    return response.data
}

/** 
 * @name getUserAccount
 * @description get the account details of the logged in user
 * @access private
 */


export async function getUserAccount() {
    const response = await api.get("/api/accounts/");

    return response.data
}

/**
 * @name getUserBalance
 * @description get the account balance of the logged in user
 * @access private
 */

export async function getUserBalance(accountId) {
    const response = await api.get(`/api/accounts/balance/${accountId}`);

    return response.data
}

/**
 * @name getUserAccountHistory
 * @description get the account history of the logged in user
 * @access private
 */

export async function getUserAccountHistory(accountId) {
    const response = await api.get(`/api/transactions/history/${accountId}`)
    return response.data
}