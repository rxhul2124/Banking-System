import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Head from '../components/Head';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAccount } from '../hooks/useAccount';
import './Profile.scss';

function Profile() {
    const { user } = useAuth();
    const { account, handleGetAccount } = useAccount();

    useEffect(() => {
        if (!account) {
            handleGetAccount();
        }
    }, [account]);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Jun 2026';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short', year: 'numeric' }); // e.g. Oct 2021
    };

    return (
        <div className="profile-container">
            <aside className="sidebar-wrapper">
                <Sidebar />
            </aside>
            <main className="main-container">
                <header className="head-container">
                    <Head title="My Profile" />
                </header>

                <section className="content-area">
                    <div className="profile-card-wrapper">
                        <div className="profile-card">
                            <div className="profile-card__avatar-container">
                                <div className="profile-card__avatar">
                                    {getInitials(user?.name)}
                                </div>
                            </div>

                            <div className="profile-card__info">
                                <h3 className="profile-card__name">{user?.name}</h3>
                                <p className="profile-card__email">{user?.email}</p>
                            </div>

                            <div className="profile-card__divider"></div>

                            <div className="profile-card__details">
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Status</span>
                                    <span className="profile-detail-badge">Active</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Account Number</span>
                                    <span className="profile-detail-value code">{account?._id || 'Loading...'}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Email Address</span>
                                    <span className="profile-detail-value">{user?.email}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Member Since</span>
                                    <span className="profile-detail-value">{formatDate(user?.createdAt)}</span>
                                </div>
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

export default Profile;
