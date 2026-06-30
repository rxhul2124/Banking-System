import { createContext, useState } from "react";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [adminLoading, setAdminLoading] = useState(false)
    const [allAccounts, setAllAccounts] = useState([])
    const [depositData, setDepositData] = useState(null)


    return (
        <AdminContext.Provider value={{ adminLoading, setAdminLoading, allAccounts, setAllAccounts, depositData, setDepositData }}>
            {children}
        </AdminContext.Provider>
    )

}