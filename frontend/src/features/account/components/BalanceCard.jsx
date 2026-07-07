import React, { useEffect, useState } from 'react';
import "./BalanceCard.scss"
import { useAccount } from "../hooks/useAccount"
import { useNavigate } from "react-router-dom"

function BalanceCard() {
    const [showBalance, setShowBalance] = useState(false);
    const navigate = useNavigate();

    const { account, handleGetUserBalance, accountBalance } = useAccount()

    useEffect(() => {
        if (account?._id) {
            handleGetUserBalance(account._id)
        }
    }, [account])

    return (
        <div className="balance-card">
            <div className="balance-card__inner">
                <p className="balance-card__label">TOTAL AVAILABLE BALANCE</p>
                <div className="balance-card__amount-row">
                    <h2 className="balance-card__amount">
                        ₹ {showBalance ? (accountBalance ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : "••••••••"}
                    </h2>
                    <button
                        className="balance-card__toggle"
                        onClick={() => setShowBalance(prev => !prev)}
                        title={showBalance ? "Hide balance" : "Show balance"}
                    >
                        <i className={`fa-solid ${showBalance ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                </div>
                <div className="balance-card__actions">
                    <button className="button btn-filled-dark" onClick={() => navigate('/transfer')}>Transfer</button>
                </div>
            </div>
        </div>
    );
}

export default BalanceCard;