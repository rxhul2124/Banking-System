import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true
})

export async function getUserAccount() {
    const response = await api.get("/api/accounts/");
    return response.data
}

export async function getUserBalance({ accountId }) {
    const response = await api.get(`/api/account/${accountId}`);

    return response.data
}