import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/account/pages/Home"
import Transfer from "./features/transfer/pages/Transfer"
import AdminDashboard from "./features/admin/pages/AdminDashboard"
import Profile from "./features/account/pages/Profile"

export const router = createBrowserRouter([
    {
        path: "/home",
        element: <Protected>
            <Home />
        </Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/transfer",
        element: <Protected>
            <Transfer />
        </Protected>
    },
    {
        path: "/admin",
        element: <Protected>
            <AdminDashboard />
        </Protected>
    },
    {
        path: "/profile",
        element: <Protected>
            <Profile />
        </Protected>
    }
])