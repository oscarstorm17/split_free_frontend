import React from "react";

export default function ViewExpenseDetailPopup({
    expense,
    expenseSplits,
    onClose
}) {

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>

                <h2 style={styles.heading}>Expense Details</h2>

                <div style={styles.info}>
                    <p><strong>Description:</strong> {expense.expenseDesc}</p>
                    <p><strong>Amount:</strong> ₹{expense.amount}</p>
                    <p><strong>Paid By:</strong> {expense.paidByUserName}</p>
                    <p><strong>Split By:</strong> {expense.splitBy}</p>
                    <p><strong>Date:</strong> {expense.date}</p>
                </div>

                <h3>Members</h3>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.header}>Member</th>
                            <th style={styles.header}>Amount</th>
                            <th style={styles.header}>Split By</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenseSplits?.map((split) => (
                            <tr key={split.splitID}>
                            <td>{split.username}</td>
                            <td>₹{split.amount}</td>
                            {expense.splitBy === "EXACT" && (
                                <td>{split.splitValue}</td>
                            )}
                            {expense.splitBy==="PERCENT" && (
                                <td>{split.splitValue}%</td>
                            )}
                            {expense.splitBy === "EQUAL" && (
                                <td>{split.splitValue}</td>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>

                <div style={styles.footer}>
                    <button
                        style={styles.button}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}

const styles = {

    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    },

    popup: {
        background: "#fff",
        width: "600px",
        borderRadius: "10px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
    },

    heading: {
        marginTop: 0,
        marginBottom: "20px"
    },

    info: {
        marginBottom: "20px",
        lineHeight: "1.8"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    header: {
        borderBottom: "2px solid #ddd",
        padding: "10px",
        textAlign: "center"
    },

    cell: {
        borderBottom: "1px solid #eee",
        padding: "10px"
    },

    footer: {
        marginTop: "20px",
        textAlign: "right"
    },

    button: {
        padding: "10px 20px",
        background: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }
};