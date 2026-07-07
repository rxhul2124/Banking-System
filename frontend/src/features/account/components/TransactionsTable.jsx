import React, { useEffect } from 'react';
import "./TransactionsTable.scss"
import { useAccount } from '../hooks/useAccount';

function TransactionTable() {

    const { handleGetUserAccountHistory, account, accountHistory, accountLoading } = useAccount()

    useEffect(() => {
        if (account?._id) {
            handleGetUserAccountHistory(account._id);
        }
    }, [account])

    if (accountLoading) {
        return (
            <div className="transactions-card">
                <div className="transactions-card__header">
                    <h3 className="transactions-card__title">Recent Transactions</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="transactions-card">
            <div className="transactions-card__header">
                <h3 className="transactions-card__title">Recent Transactions</h3>
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
                    {[...(accountHistory || [])]
                        .sort((a, b) => {
                            const dateA = a.transaction?.createdAt ? new Date(a.transaction.createdAt).getTime() : 0;
                            const dateB = b.transaction?.createdAt ? new Date(b.transaction.createdAt).getTime() : 0;
                            return dateB - dateA;
                        })
                        .map(tx => (
                            <tr key={tx._id}>
                                <td>
                                    <div className="tx-info">
                                        <div className="tx-info__text">
                                            <span className="tx-info__name">{tx.transaction.fromAccount._id === account._id ? tx.transaction.toAccount.user.name : tx.transaction.fromAccount.user.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="tx-date">{
                                    new Date(tx.transaction.createdAt).toLocaleString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }</td>
                                <td className={`tx-amount tx-amount--${tx.type.toLowerCase()}`}>
                                    {tx.type === "CREDIT" ? `+${'\u20B9'}${tx.transaction.amount}` : `-${'\u20B9'}${tx.transaction.amount}`}
                                </td>
                                <td>
                                    <span className={`tx-status tx-status--${tx.type.toLowerCase()}`}>
                                        {tx.type === "CREDIT" ? "CREDITED" : "DEBITED"}
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