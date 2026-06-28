import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Register = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const { loading, handleRegister } = useAuth();


    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        if (!email || !password) {
            setErrorMessage("Email and password are required")
            return
        }

        e.preventDefault()

        try {
            await handleRegister({
                email: email.trim(),
                name: name.trim(),
                password: password.trim()
            })
            navigate("/home")
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Unable to log in")
        }
        setEmail("")
        setName("")
        setPassword("")
    }
    return (
        <main className="container">
            <div className="form-container">
                <div className="heading">
                    <p><span>Welcome to SkyBank</span></p>
                    <p>Secure, simple and fast banking</p>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" value={email} placeholder="Enter your email address" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => { setName(e.target.value) }}
                            type="text" id="name" name="name" value={name} placeholder="Enter your name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? "Registering in..." : "Register"}
                    </button>
                </form>
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register
