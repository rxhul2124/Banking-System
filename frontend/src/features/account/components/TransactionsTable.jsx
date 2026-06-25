import React from 'react';
import "./TransactionsTable.scss"

function TransactionTable() {
    return (
        <>
            <div className="transaction-container">
                <div className="transaction-head">
                    <p>Recent Transactions</p>
                </div>
                <table className="transaction-table">
                    <tr className="table-row">
                        <th>Transaction</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    <tr className='table-row'>
                        <td>Apple</td>
                        <td>12-4-26</td>
                        <td>2000</td>
                        <td>sent</td>
                    </tr><tr className='table-row'>
                        <td>Apple</td>
                        <td>12-4-26</td>
                        <td>2000</td>
                        <td>sent</td>
                    </tr><tr className='table-row'>
                        <td>Apple</td>
                        <td>12-4-26</td>
                        <td>2000</td>
                        <td>sent</td>
                    </tr><tr className='table-row'>
                        <td>Apple</td>
                        <td>12-4-26</td>
                        <td>2000</td>
                        <td>sent</td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default TransactionTable;