import React from 'react';
import "./AccountDashboard.scss"


function AccountDashboard() {
    return (
        <>
            <div className="account-container">
                <div className="account-head">
                    <p>Account details</p>
                </div>
                <div className="account-detail">
                    <p>Name: Jhon Dee</p>
                    <p>Email: jhondee@gmail.com</p>
                    <p>Account No.:</p>
                </div>
            </div>
        </>
    );
}

export default AccountDashboard;
