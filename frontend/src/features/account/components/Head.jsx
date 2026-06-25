import React from 'react';
import "./Head.scss"

function Head() {
    return (
        <div className="head">
            <p>Welcome back, Rxhul</p>
            <div className="head-options">
                <div className="notification">
                    <i class="fa-regular fa-bell"></i>
                </div>
                <div className="theme">
                    <i class="fa-solid fa-moon"></i>
                </div>
            </div>
        </div>
    );
}

export default Head;