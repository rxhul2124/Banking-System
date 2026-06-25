import React from "react"
import "../account.style.scss"
import "../../../style/button.scss"

import Sidebar from "../components/Sidebar"
import BalanceCard from "../components/BalanceCard"
import AccountDashboard from "../components/AccountDashboard"
import TransactionTable from "../components/TransactionsTable"
import Head from "../components/Head"

const Home = () => {
    return <>
        <div className="home-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-container">
                <div className="head-container">
                    <Head />
                </div>
                <div className="account-details">
                    <BalanceCard />
                    <AccountDashboard />
                </div>
                <div className="transaction-table">
                    <TransactionTable />
                </div>
            </div>

        </div>

    </>
}

export default Home