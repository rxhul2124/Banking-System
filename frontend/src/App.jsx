import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { AccountProvider } from "./features/account/account.context.jsx"
import { TransferProvider } from "./features/transfer/transfer.context.jsx"

function App() {
  return (
    <AuthProvider>
      <TransferProvider>
        <AccountProvider>
          <RouterProvider router={router} />
        </AccountProvider>
      </TransferProvider>
    </AuthProvider>
  )
}

export default App
