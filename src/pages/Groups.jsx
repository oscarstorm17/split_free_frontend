import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getGroups} from "../services/groupsService";
import Navbar from "../elements/Navbar"


const Groups = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("currentUser");
  
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("groupID");
    localStorage.removeItem("ExpenseID");
    localStorage.removeItem("groupName");
    if(!token){
      navigate("/");
      return;
    } 

    //fetch groups
    getGroups().then((data) => {
      setGroups(data);
    }).catch((err) => {
      console.error(err);
        setError("Internal Server Error");
    });
  }, []);

  const viewExpenses = (e) => {
    navigate("/viewExpenses");
  };

  return (
    <div>
      <Navbar/>
      <div>

        {/* <h1>Welcome, {username} 👋</h1> */}
        <h2>Your groups : {username}</h2>
        {error && <p style={{ color: "orange" }}>{error}</p>}
        {groups.length === 0 ?
          (<p>No groups found</p>) :
          (<ul>
            {groups.map((group) =>
            (
              <table style={styles.table} key={group.groupID}>
                <tbody>
                    <tr key={group.groupID} style={styles.row}>
                      <td style={styles.name}>
                        <strong>{group.groupName}</strong>
                      </td>
                      <td style={styles.buttonCell}>
                        <button
                          onClick={() => {viewExpenses(group.groupID)
                            localStorage.setItem("groupID", group.groupID);
                            localStorage.setItem("groupName", group.groupName);
                          }}
                          style={styles.button}
                        >
                          View Expenses
                        </button>
                      </td>
                      <td style={styles.buttonCell} >
                        <button style={styles.button}
                        onClick={() => {
                          navigate(`/groups/${group.groupID}`);
                          localStorage.setItem("groupID", group.groupID);
                          localStorage.setItem("groupName", group.groupName);
                        }}
                        >
                          Add New Expense
                        </button>
                      </td>
                    </tr>
                </tbody>
              </table>
            ))}
          </ul>
          )}
      </div>
    </div>
  );
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
    //cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "16px",
    borderBottom: "1px solid #ddd",
    borderTop: "1px solid #ddd",
  },

  name: {
    padding: "12px",
    borderRight: "1px solid #ddd",
    borderLeft: "1px solid #ddd",
  },

  buttonCell: {
    width: "160px",
    textAlign: "right",
    padding: "12px",
    cursor: "pointer",
    borderRight: "1px solid #ddd"
  },

  button: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
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
export default Groups;