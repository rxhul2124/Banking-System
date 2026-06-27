import React from 'react';
import { Link } from 'react-router-dom';
import "./TransactionsTable.scss"

const transactions = [
    {
        id: 1,
        name: 'Apple Store',
        iconColor: '#6366f1',
        date: 'Oct 24, 2024',
        amount: '-$1,299.00',
        amountType: 'debit',
        status: 'Sent',
    },
    {
        id: 2,
        name: 'Stripe Payout',
        iconColor: '#16a34a',
        date: 'Oct 22, 2024',
        amount: '+$4,500.00',
        amountType: 'credit',
        status: 'Received',
    },
    {
        id: 3,
        name: 'Blue Bottle Coffee',
        iconColor: '#d97706',
        date: 'Oct 21, 2024',
        amount: '-$12.50',
        amountType: 'debit',
        status: 'Sent',
    },
];

function TransactionTable() {
    return (
        <div className="transactions-card">
            <div className="transactions-card__header">
                <h3 className="transactions-card__title">Recent Transactions</h3>
                <Link to="/transactions" className="transactions-card__view-all">View All</Link>
            </div>

            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>TRANSACTION</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>
                                <div className="tx-info">
                                    <div className="tx-info__text">
                                        <span className="tx-info__name">{tx.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="tx-date">{tx.date}</td>
                            <td className={`tx-amount tx-amount--${tx.amountType}`}>{tx.amount}</td>
                            <td>
                                <span className={`tx-status tx-status--${tx.status.toLowerCase()}`}>
                                    {tx.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;