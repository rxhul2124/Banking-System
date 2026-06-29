import React, { useState, useEffect } from 'react';
import { useAccount } from '../../account/hooks/useAccount';
import Sidebar from '../../account/components/Sidebar';
import Head from '../../account/components/Head';
import TransactionTable from '../../account/components/TransactionsTable';
import './Transfer.scss';
import { useTransfer } from '../hooks/useTransfer';

function Transfer() {
    const { account, accountBalance, handleGetAccount, handleGetUserBalance, handleGetUserAccountHistory } = useAccount();
    const { transferData, setTransferData, transferLoading, handleTransferSubmit } = useTransfer();

    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!account) {
            handleGetAccount();
        } else {
            setFromAccount(account._id || '');
            if (accountBalance === null) {
                handleGetUserBalance(account._id);
            }
        }
    }, [account, accountBalance]);

    const handleCloseReceipt = () => {
        setTransferData(null);
        if (account?._id) {
            handleGetUserBalance(account._id);
            handleGetUserAccountHistory(account._id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!toAccount) {
            setErrorMessage('Recipient account number is required.');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setErrorMessage('Please enter a valid amount greater than 0.');
            return;
        }
        if (parseFloat(amount) > (accountBalance || 0)) {
            setErrorMessage('Insufficient balance for this transaction.');
            return;
        }
        if (toAccount === fromAccount) {
            setErrorMessage('Cannot transfer to the same account.');
            return;
        }

        setIsSubmitting(true);

        try {
            await handleTransferSubmit(fromAccount, toAccount, amount);
            setIsSubmitting(false);
            setToAccount('');
            setAmount('');
            setNotes('');
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
            setErrorMessage(err.response?.data?.message || 'Transfer failed. Please try again.');
        }
    };


    return (
        <div className="transfer-container">
            <aside className="sidebar-wrapper">
                <Sidebar />
            </aside>
            <main className="main-container">
                <header className="head-container">
                    <Head title="Transfer Funds" />
                </header>
                <section className="content-area">
                    <div className="transfer-grid">
                        <div className="transfer-grid__form">
                            <div className="transfer-card">
                                <div className="transfer-card__header">
                                    <h3 className="transfer-card__title">Transfer Funds</h3>
                                    <p className="transfer-card__subtitle">Send money instantly to any SkyBank account</p>
                                </div>

                                <form className="transfer-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Source Account</label>
                                        <div className="input-wrapper disabled">
                                            <span className="input-icon">
                                                <i className="fa-solid fa-wallet"></i>
                                            </span>
                                            <input
                                                type="text"
                                                value={fromAccount ? `${fromAccount} (Primary Account)` : 'Loading account...'}
                                                disabled
                                                className="form-input"
                                            />
                                        </div>
                                        {accountBalance !== null && (
                                            <span className="form-helper-text success">
                                                Available Balance: <strong>INR {accountBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="toAccount">Recipient Account ID</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">
                                                <i className="fa-solid fa-user-astronaut"></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="toAccount"
                                                placeholder="Enter recipient's account ID"
                                                value={toAccount}
                                                onChange={(e) => setToAccount(e.target.value)}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="amount">Amount (INR)</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">
                                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                            </span>
                                            <input
                                                type="number"
                                                id="amount"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="form-input"
                                                required
                                                min="1"
                                                step="any"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="notes">Remarks / Reference (Optional)</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">
                                                <i className="fa-solid fa-comment-dots"></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="notes"
                                                placeholder="Rent, utilities, gift, etc."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="alert-message error">
                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="alert-message success">
                                            <i className="fa-solid fa-circle-check"></i>
                                            <span>{successMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="button btn-primary submit-btn"
                                        disabled={isSubmitting || !account}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                                                <span>Processing Transfer...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-paper-plane"></i>
                                                <span>Initiate Transfer</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="transfer-grid__table">
                            <TransactionTable />
                        </div>
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

            {transferData && (
                <div className="receipt-overlay">
                    <div className="receipt-card">
                        <div className="receipt-card__header">
                            <div className="receipt-card__status-icon">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <h4 className="receipt-card__status-title">Transfer Successful</h4>
                            <p className="receipt-card__status-subtitle">Your transaction has been processed</p>
                        </div>
                        
                        <div className="receipt-card__amount">
                            <span className="receipt-card__currency">INR</span>
                            <span className="receipt-card__value">
                                {transferData.transaction?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        
                        <div className="receipt-card__divider"></div>
                        
                        <div className="receipt-card__details">
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Transaction ID</span>
                                <span className="receipt-detail-value code">{transferData.transaction?._id}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Source Account</span>
                                <span className="receipt-detail-value code">{transferData.transaction?.fromAccount}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Recipient Account</span>
                                <span className="receipt-detail-value code">{transferData.transaction?.toAccount}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Date & Time</span>
                                <span className="receipt-detail-value">
                                    {new Date(transferData.transaction?.createdAt).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Status</span>
                                <span className="receipt-detail-value badge success">
                                    {transferData.transaction?.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className="receipt-card__footer">
                            <button className="button btn-primary receipt-btn" onClick={handleCloseReceipt}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transfer;
