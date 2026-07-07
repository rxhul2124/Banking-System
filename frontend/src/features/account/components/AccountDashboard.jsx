import React, { useEffect, useState } from 'react';
import "./AccountDashboard.scss"
import { useAuth } from "../../auth/hooks/useAuth"
import { useAccount } from '../hooks/useAccount';


function AccountDashboard() {
    const [showAccountNo, setShowAccountNo] = useState(false);

    const { user } = useAuth()

    useEffect(() => {
        handleGetAccount();
    }, []);

    const { account, handleGetAccount } = useAccount()

    return (
        <div className="account-container">
            <div className="account-head">
                <h3>Account Details</h3>
            </div>
            <div className="account-detail">
                <div className="detail-row">
                    <div className="detail-icon">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="detail-info">
                        <span className="detail-label">Full Name</span>
                        <span className="detail-value">{user.name}</span>
                    </div>
                </div>
                <div className="detail-row">
                    <div className="detail-icon detail-icon--email">
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="detail-info">
                        <span className="detail-label">Email Address</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                </div>
                <div className="detail-row">
                    <div className="detail-icon detail-icon--account">
                        <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="detail-info">
                        <span className="detail-label">Account No.</span>
                        <span className="detail-value">{showAccountNo ? account?._id : "••••••••••••"}</span>
                    </div>
                    <button
                        className="detail-toggle"
                        onClick={() => setShowAccountNo(prev => !prev)}
                        title={showAccountNo ? "Hide account number" : "Show account number"}
                    >
                        <i className={`fa-solid ${showAccountNo ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountDashboard;
