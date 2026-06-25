import React from 'react';
import "./BalanceCard.scss"

function BalanceCard() {
    return (
        <>
            <div className="balance-container">
                <p>TOTAL AVAILABLE BALANCE</p>
                <p><span>&#8377; 21383</span></p>
                <div className="balance-button">
                    <button className='button balance-button'>Add Funds</button>
                    <button className='button'>Transfer</button>
                </div>
            </div>
        </>
    );
}

export default BalanceCard;