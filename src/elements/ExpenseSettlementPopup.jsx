import React from "react";


export default function ExpenseSettlementPopup({
    settlementData,
    onClose
}) {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2 style={styles.heading}>Expense Details</h2>
                <table>
                    <tr style={styles.row}>
                        <td style={styles.heading} ><strong>FROM</strong></td>
                        <td style={styles.heading}><strong>{"---------->"}</strong></td>
                        <td style={styles.heading}><strong>TO</strong></td>

                    </tr>
                    {settlementData.length === 0 ?
                        (
                            <div><p>No settlement found</p></div>
                        ) : (
                            settlementData.map((data => (
                                <tr style={styles.row}>
                                    <td style={styles.name}>{data.fromUser}</td>
                                    <td style={styles.name}><p>{"---------->"+data.amount}</p></td>
                                    <td style={styles.name}>{data.toUser}</td>
                                </tr>
                            )))
                        )
                    }
                </table>
                <div style={styles.footer}>
                    <button style={styles.button}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>

        </div>
    )
};


const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse"
      },
    
      row: {
        padding: "14px 18px",
        margin: "30px 5px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        cursor: "text",
        transition: "all 0.2s ease",
        fontSize: "16px",
        borderBottom: "1px solid #ddd"
      },
    
      name: {
        padding: "12px",
        cursor: "text",
        borderRight: "1px solid #ddd",
      },
    
      heading: {
        padding: "15px",
        cursor: "pointer",
        borderRight: "1px solid #ddd",
    
      },
    
      buttonCell: {
        width: "160px",
        textAlign: "right",
        padding: "12px"
      },
    
      groupItem: {
        listStyle: "none",
        padding: "14px 18px",
        margin: "10px 0",
        // backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "16px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.08)"
      },

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

    info: {
        marginBottom: "20px",
        lineHeight: "1.8"
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