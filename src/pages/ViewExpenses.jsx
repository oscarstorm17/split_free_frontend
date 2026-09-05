import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../services/groupsService";
import { getExpenses } from "../services/getExpensesByGroupID";
import Navbar from "../elements/Navbar";
import { getExpensesSplit } from "../services/getExpenseSplitService";
import ViewExpenseDetailPopup from "../elements/ViewExpenseDetailPopup";
import ExpenseSettlementPopup from "../elements/ExpenseSettlementPopup";
import { getExpenseSettlementPopup } from "../services/ExpenseSettlementPopupService";

const ViewExpenses = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("currentUser");
  const [expenses, setExpenses] = useState([]);
  const [expenseID, setExpenseID] = useState({});
  const [expense, setExpense] = useState({});
  const [error, setError] = useState("");
  const [expenseSplit, setExpenseSplit] = useState([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showExpenseSettlementPopup, setShowExpenseSettlementPopup] = useState(false);
  const [settlementData, setSettlementData] = useState([]);
  //const [groupID, setGroupID] = useState("");

  const groupID = localStorage.getItem("groupID");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); return;
    }
    getExpenses(groupID).then((data) => {
      setExpenses(data);
      //localStorage.setItem("expenseID", data.expenseID);
      setExpenseID(data.expenseID);
    }).catch((err) => {
      console.error(err);
      setError("Internal Server Error");
    })
  }, []);

  const onClickViewDetails = async (expense) => {
    setExpense(expense);
    localStorage.setItem("ExpenseID", expense.expenseID);
    try {
      const splits = await getExpensesSplit(expense.expenseID);
      setExpenseSplit(splits);
      setShowDetailsPopup(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onClickExpenseSettlement = async () => {
    try{
      const expenseSettlement = await getExpenseSettlementPopup(groupID);
      setSettlementData(expenseSettlement);
      setShowExpenseSettlementPopup(true);
    }
    catch (err){
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h2>Expenses: {localStorage.getItem("groupName")}</h2>
        {error && <p style={{ color: "orange" }}>{error}</p>}


        
        <table style={{...styles.table, display:"flex"}} >
          <tbody>
            <tr style={styles.row}>
              <td style={styles.heading}><strong>DESCRIPTION</strong></td>
              <td style={styles.heading}><strong>AMOUNT</strong></td>
              <td style={styles.heading}><strong>PAID BY</strong></td>
              <td style={styles.heading}><strong>SPLIT BY</strong></td>
              <td style={styles.heading}><strong></strong></td>
            </tr>
            {expenses.length === 0 ?
              (<div style={{...styles.row,color:'red', padding:0, display:"flex", justifyContent:"center"}}  ><p>No Expenses found............</p>
              </div>
              ) :

              (
                
                expenses.map((expense => (
                <tr key={expense.expenseID} style={styles.row}>
                  <td>
                    {expense.expenseDesc}
                  </td>
                  <td style={styles.name}>{expense.amount}</td>
                  <td style={styles.name}>{expense.paidByUserName}</td>
                  <td style={styles.name}>{expense.splitBy}</td>
                  <td style={styles.name}><button onClick={() => {
                    onClickViewDetails(expense)
                  }}>View Details</button></td>
                </tr>


              )))

              )
            }
          </tbody>
        </table>
        {showDetailsPopup && (
          <ViewExpenseDetailPopup
            expense={expense}
            expenseSplits={expenseSplit}
            onClose={() => setShowDetailsPopup(false)}
          >

          </ViewExpenseDetailPopup>
        )}

      </div>
      <button style={{...styles.buttonCell, marginTop:"20px"}} 
        onClick={onClickExpenseSettlement}
      >Calculate shares</button>
      {showExpenseSettlementPopup && (
        <ExpenseSettlementPopup
          settlementData={settlementData}
          onClose={()=> setShowExpenseSettlementPopup(false)}
        >

        </ExpenseSettlementPopup>
      )

      }
    </div>
  );
}

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

  button: {
    backgroundColor: "#f9f9f9",
  },

  logout: {
    padding: "10px"
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

  groupItemHover: {
    // backgroundColor: "#e8e8e8",
    transform: "translateY(-2px)"
  }

}

export default ViewExpenses;