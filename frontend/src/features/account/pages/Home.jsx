import React from "react"
import "../account.style.scss"
import "../../../style/button.scss"

import Sidebar from "../components/Sidebar"
import BalanceCard from "../components/BalanceCard"
import AccountDashboard from "../components/AccountDashboard"
import TransactionTable from "../components/TransactionsTable"
import Head from "../components/Head"

const Home = () => {
    return (
        <div className="home-container">
            <aside className="sidebar-wrapper">
                <Sidebar />
            </aside>
            <main className="main-container">
                <header className="head-container">
                    <Head />
                </header>
                <section className="content-area">
                    <div className="top-row">
                        <div className="top-row__balance">
                            <BalanceCard />
                        </div>
                        <div className="top-row__accounts">
                            <AccountDashboard />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <TransactionTable />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home