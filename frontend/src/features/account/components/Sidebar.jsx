import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Sidebar.scss"
import { useAuth } from '../../auth/hooks/useAuth';

function Sidebar() {
    const { handleLogout, user } = useAuth();
    const navigate = useNavigate();


    const onLogout = async () => {
        try {
            await handleLogout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside className="sidebar-container">
            <div className="sidebar-top">
                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">SkyBank</span>
                        <span className="brand-tagline">Fintech Solutions</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <i className="fa-solid fa-table-columns"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/transactions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        <span>Transfers</span>
                    </NavLink>
                    {user?.systemUser && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            <i className="fa-solid fa-headset"></i>
                            <span>Admin</span>
                        </NavLink>
                    )}
                </nav>
            </div>

            <div className="sidebar-bottom">
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <i className="fa-solid fa-user"></i>
                    <span>Profile</span>
                </NavLink>
                <button className="nav-link logout-link" onClick={onLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;