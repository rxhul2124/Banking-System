import { createContext, useContext, useState } from 'react';

export const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
    const [transferData, setTransferData] = useState(null)
    const [transferloading, setTransferLoading] = useState(false)


    return (
        <TransferContext.Provider value={{ transferData, setTransferData, transferloading, setTransferLoading }}>
            {children}
        </TransferContext.Provider>
    )
}