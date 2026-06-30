import React, { useState, useEffect } from 'react';
import Sidebar from '../../account/components/Sidebar';
import Head from '../../account/components/Head';
import './AdminDashboard.scss';

import { useAdmin } from '../hooks/useAdmin';

function AdminDashboard() {

    const { adminLoading, handleCreateInitialTransaction, handleGetAllUserAccounts, allAccounts, depositData, setDepositData } = useAdmin()

    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        handleGetAllUserAccounts();
    }, []);

    useEffect(() => {
        if (allAccounts.length > 0 && !selectedUser) {
            setSelectedUser(allAccounts[0]);
        }
    }, [allAccounts, selectedUser]);

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const handleCloseReceipt = () => {
        setDepositData(null);
        handleGetAllUserAccounts();
    };

    const handleSubmitDeposit = async (e) => {
        e.preventDefault();
        if (!selectedUser || !amount) return;

        try {
            await handleCreateInitialTransaction(selectedUser._id, amount);
            setAmount('');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Deposit failed');
        }
    };

    const allAccountsFiltered = allAccounts.filter(acc =>
        acc.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-container">
            <aside className="sidebar-wrapper">
                <Sidebar />
            </aside>
            <main className="main-container">
                <header className="head-container">
                    <Head title="Admin Console" />
                </header>

                <section className="content-area">
                    <div className="admin-header">
                        <div className="admin-header__text">
                            <h2 className="admin-header__title">Fund Management</h2>
                            <p className="admin-header__subtitle">Manage and allocate funds to user accounts.</p>
                        </div>
                        <div className="admin-header__search">
                            <div className="search-wrapper">
                                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Search by ID or Email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="admin-grid">
                        {/* System Users Table Column */}
                        <div className="admin-grid__users">
                            <div className="users-card">
                                <div className="users-card__header">
                                    <h3 className="users-card__title">System Users</h3>
                                    <span className="users-card__badge">Total: {allAccountsFiltered.length}</span>
                                </div>

                                <div className="table-responsive">
                                    <table className="users-table">
                                        <thead>
                                            <tr>
                                                <th>USER</th>
                                                <th>USER ID</th>
                                                <th>STATUS</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allAccountsFiltered.map((user) => (
                                                <tr
                                                    key={user._id}
                                                    className={selectedUser?._id === user._id ? 'active-row' : ''}
                                                    onClick={() => setSelectedUser(user)}
                                                >
                                                    <td>
                                                        <div className="user-info">
                                                            <div className="user-avatar">{getInitials(user.user?.name)}</div>
                                                            <div className="user-details">
                                                                <span className="user-name">{user.user?.name}</span>
                                                                <span className="user-email">{user.user?.email}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="user-id">{user._id}</td>
                                                    <td>
                                                        <span className={`status-pill status-pill--${user.status.toLowerCase()}`}>
                                                            <span className="status-dot"></span>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {selectedUser?._id !== user._id && (
                                                            <button className="btn-manage" onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedUser(user);
                                                            }}>
                                                                Manage
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Add Funds Form Column */}
                        <div className="admin-grid__actions">
                            <div className="actions-card">
                                <div className="actions-card__header">
                                    <i className="fa-solid fa-circle-dollar-to-slot header-icon"></i>
                                    <h3 className="actions-card__title">Add Funds</h3>
                                </div>

                                <div className="selected-user-box">
                                    <span className="selected-user-label">SELECTED USER</span>
                                    {selectedUser ? (
                                        <>
                                            <h4 className="selected-user-name">{selectedUser.user?.name}</h4>
                                            <span className="selected-user-id">ID: {selectedUser._id}</span>
                                        </>
                                    ) : (
                                        <span className="selected-user-placeholder">Select a user to allocate funds</span>
                                    )}
                                </div>

                                <form className="actions-form" onSubmit={handleSubmitDeposit}>
                                    <div className="form-group">
                                        <label className="form-label">Amount (INR)</label>
                                        <div className="input-wrapper">
                                            <span className="input-prefix">INR</span>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="compliance-box">
                                        <i className="fa-solid fa-circle-info compliance-icon"></i>
                                        <p className="compliance-text">
                                            Funds will be available in the user's account immediately upon confirmation. This action is logged for compliance.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="button btn-confirm"
                                        disabled={adminLoading || !selectedUser || !amount}
                                    >
                                        {adminLoading ? (
                                            <>
                                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                                                <span>Processing Deposit...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-money-bill-transfer"></i>
                                                Confirm Deposit
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
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

            {depositData && (
                <div className="receipt-overlay">
                    <div className="receipt-card">
                        <div className="receipt-card__header">
                            <div className="receipt-card__status-icon">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <h4 className="receipt-card__status-title">Deposit Successful</h4>
                            <p className="receipt-card__status-subtitle">Funds have been allocated successfully</p>
                        </div>
                        
                        <div className="receipt-card__amount">
                            <span className="receipt-card__currency">INR</span>
                            <span className="receipt-card__value">
                                {depositData.transaction?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        
                        <div className="receipt-card__divider"></div>
                        
                        <div className="receipt-card__details">
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Transaction ID</span>
                                <span className="receipt-detail-value code">{depositData.transaction?._id}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Source Account</span>
                                <span className="receipt-detail-value code">{depositData.transaction?.fromAccount}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Recipient Account</span>
                                <span className="receipt-detail-value code">{depositData.transaction?.toAccount}</span>
                            </div>
                            <div className="receipt-detail-row">
                                <span className="receipt-detail-label">Date & Time</span>
                                <span className="receipt-detail-value">
                                    {new Date(depositData.transaction?.createdAt).toLocaleString('en-IN', {
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
                                    {depositData.transaction?.status}
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

export default AdminDashboard;
