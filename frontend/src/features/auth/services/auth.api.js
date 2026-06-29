import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: true
})

/**
 * @name register
 * @description register a new user
 * @access public
 */

export async function register({ name, email, password }) {
    const response = await api.post("/api/auth/register", {
        name, email, password
    })

    return response.data
}


/**
 * @name login
 * @description login a user
 * @access public
 */

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email, password
    })

    return response.data
}

/**
 * @name logout
 * @description logout a user
 * @access private
 */

export async function logout() {
    const response = await api.post("/api/auth/logout")

    return response.data
}

/**
 * @name getCurrentUser
 * @description get current logged in user
 * @access private
 */

export async function getCurrentUser() {
    const response = await api.get("/api/auth/me")
    return response.data
}