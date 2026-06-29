import React, { useState } from 'react';
import Sidebar from '../../account/components/Sidebar';
import Head from '../../account/components/Head';
import './AdminDashboard.scss';

function AdminDashboard() {
    const mockUsers = [
        { initials: 'AJ', name: 'Alice Johnson', email: 'alice.j@example.com', id: 'USR-9821', status: 'Active' },
        { initials: 'MC', name: 'Michael Chen', email: 'm.chen@domain.co', id: 'USR-7432', status: 'Active' },
        { initials: 'SW', name: 'Sarah Williams', email: 'sarah.w@example.org', id: 'USR-2105', status: 'Pending' },
        { initials: 'DT', name: 'David Thompson', email: 'd.thompson@mail.com', id: 'USR-4490', status: 'Active' }
    ];

    const [selectedUser, setSelectedUser] = useState(mockUsers[3]); // Default select David Thompson
    const [searchQuery, setSearchQuery] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    <span className="users-card__badge">Total: 1,204</span>
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
                                            {filteredUsers.map((user) => (
                                                <tr 
                                                    key={user.id} 
                                                    className={selectedUser?.id === user.id ? 'active-row' : ''}
                                                    onClick={() => setSelectedUser(user)}
                                                >
                                                    <td>
                                                        <div className="user-info">
                                                            <div className="user-avatar">{user.initials}</div>
                                                            <div className="user-details">
                                                                <span className="user-name">{user.name}</span>
                                                                <span className="user-email">{user.email}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="user-id">{user.id}</td>
                                                    <td>
                                                        <span className={`status-pill status-pill--${user.status.toLowerCase()}`}>
                                                            <span className="status-dot"></span>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {selectedUser?.id !== user.id && (
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
                                            <h4 className="selected-user-name">{selectedUser.name}</h4>
                                            <span className="selected-user-id">ID: {selectedUser.id}</span>
                                        </>
                                    ) : (
                                        <span className="selected-user-placeholder">Select a user to allocate funds</span>
                                    )}
                                </div>

                                <form className="actions-form" onSubmit={(e) => e.preventDefault()}>
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

                                    <div className="form-group">
                                        <label className="form-label">Transaction Note (Optional)</label>
                                        <textarea 
                                            placeholder="e.g., Refund for order #1234, Bonus credit..." 
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="form-textarea"
                                            rows="3"
                                        />
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
                                        disabled={!selectedUser || !amount}
                                    >
                                        <i className="fa-solid fa-money-bill-transfer"></i>
                                        Confirm Deposit
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
        </div>
    );
}

export default AdminDashboard;
