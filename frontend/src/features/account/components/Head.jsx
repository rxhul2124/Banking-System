import React, { useState, useEffect } from 'react';
import "./Head.scss"
import { useAuth } from "../../auth/hooks/useAuth"

function Head({ title }) {

    const { user } = useAuth();
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <div className="head">
            <h1 className="head-greeting">{title || `Welcome back, ${user?.name}`}</h1>
            <div className="head-options">
                <button className="head-icon-btn" title="Notifications">
                    <i className="fa-regular fa-bell"></i>
                </button>
                <button className="head-icon-btn" onClick={toggleTheme} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                    <i className={isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                </button>
            </div>
        </div>
    );
}

export default Head;