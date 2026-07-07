import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import "./Protected.scss";

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-screen__card">
                    <div className="loading-screen__logo">
                        <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="loading-screen__spinner"></div>
                    <p className="loading-screen__text">Loading your session...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return children
}

export default Protected