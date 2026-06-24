import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register, logout } from "../services/auth.api"

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return data
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ email, name, password }) => {
        setLoading(true)
        try {
            const data = await register({ email, name, password })
            setUser(data.user)
            return data
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            return data
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleLogin, handleLogout, handleRegister }

}