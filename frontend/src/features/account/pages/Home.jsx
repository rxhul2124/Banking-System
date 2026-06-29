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
                <footer className="app-footer">
                    <span className="footer-copy">© 2026 SkyBank Financial. All rights reserved.</span>
                    <div className="footer-links">
                        <a href="#security">Security</a>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#contact">Contact Us</a>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default Home