import { useEffect } from "react"
import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { AccountProvider } from "./features/account/account.context.jsx"
import { TransferProvider } from "./features/transfer/transfer.context.jsx"
import { AdminProvider } from "./features/admin/admin.context.jsx"

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', savedTheme || systemTheme);
  }, []);

  return (
    <AuthProvider>
      <AdminProvider>
        <TransferProvider>
          <AccountProvider>
            <RouterProvider router={router} />
          </AccountProvider>
        </TransferProvider>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
