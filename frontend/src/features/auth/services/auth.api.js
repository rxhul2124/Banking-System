import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true
})

export async function register({ name, email, password }) {
    const response = await api.post("/api/auth/register", {
        name, email, password
    })

    return response.data
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email, password
    })

    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")

    return response.data
}