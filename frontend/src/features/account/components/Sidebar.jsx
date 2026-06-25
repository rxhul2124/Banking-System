import React from 'react';
import "./Sidebar.scss"

function Sidebar() {
    return (
        <>
            <main className="sidebar-container">
                <div className="upper-section">
                    <div className="upper-head">
                        <div className="logo">
                            <i class="fa-solid fa-building-columns"></i>
                        </div>
                        <div className="heading">
                            <p><span>Sky Bank</span></p>
                            <p>Fintech Solutions</p>
                        </div>
                    </div>
                    <div className="link-group">
                        <div className="link">
                            <i class="fa-solid fa-kaaba"></i>
                            <p>Dashboard</p>
                        </div>
                        <div className="link">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            <p>Transfer</p>
                        </div>
                        <div className="Admin link">
                            <i class="fa-solid fa-user-tie"></i>
                            <p>Admin</p>
                        </div>
                    </div>
                </div>
                <div className="profile-container">
                    <i class="fa-solid fa-circle-user"></i>
                    <p>Profile</p>
                </div>
            </main>
        </>
    )
}

export default Sidebar;