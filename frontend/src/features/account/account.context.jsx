import { createContext, useActionState, useEffect, useState } from "react";

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null)
    const [accountBalance, setAccountBalance] = useState(null)

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    )
}