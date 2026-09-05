import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/Navbar";
import {getGroup} from "../services/groupService";
import {saveExpense} from "../services/saveExpense";
import {saveExpenseSplit} from "../services/saveExpenseSplitService";
import MemberPopup from "../elements/MemberPupup2";
import {getUser} from "../services/getUserByUsernameService";

export default function AddExpense() {
  const navigate = useNavigate();
  const groupID = localStorage.getItem("groupID");
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState({});
  const [paidByUserName, setPaidByUserName] = useState("");
  const [expenseID, setexpenseID] = useState("");
  const [splitBy, setSplitBy] = useState("");
  const [splits, setsplits] = useState ({});
  const [user, setSplitUser] = useState({});
  const [amount, setAmount] = useState("");
  const [form, setForm] = useState({
    group,
    amount,
    expenseDesc: "",
    paidByUserName: "",
    splitBy: "PERCENT",
    date: ""
  });
  const [splitObject, setSplitObject] = useState({
    expenseId: "",
    splitBy: "",
    splits: []
  })
  

  useEffect(() => {
    setForm((prev) => ({ ...prev, group }));
  }, [group]);

  useEffect(() => {
    setForm((prev) => ({...prev,paidByUserName}));
  },[paidByUserName]);

  useEffect(() => {
    if (form?.splitBy) {
      setSplitBy(form.splitBy);
    }
  }, [form]);
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/");
            return;
        } 
        getGroup(groupID).then((data) => {
            setGroup(data);
            setMembers(data.members);
          }).catch((err) => {
            console.error(err);
              setError("Internal Server Error");
          });
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMemberPopup(true);
    setAmount(form.amount);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
      <h2 style={styles.heading}>{group.groupName}</h2>
        <h2 style={styles.heading}>Add expense</h2>
        
        <form onSubmit={handleSubmit} required >
          <div style={styles.field}>
            <label style={styles.label} hidden={true} >Group ID</label>
            <input readOnly style={styles.input} type="text" name="groupID" value={groupID} hidden={true} required  />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Amount</label>
            <input style={styles.input} type="number" name="amount" value={form.amount} onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Expense description</label>
            <input style={styles.input} type="text" name="expenseDesc" value={form.expenseDesc} onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Paid by (user ID)</label>
            {/* <input style={styles.input} type="text" name="paidByUserName" value={form.paidByUserName} onChange={handleChange} required /> */}
            <select style={styles.select}
              value={paidByUserName}
              onChange={(e) => setPaidByUserName(e.target.value)}
              required
            >
            <option  value=""></option>
              {members.map((member,i) => (
                <option key={i} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Split by</label>
            <select style={styles.select} name="splitBy" value={form.splitBy} onChange={handleChange} required>
              
              <option value="EQUAL">EQUAL</option>
              <option value="PERCENT">PERCENT</option>
              <option value="EXACT">EXACT</option>
              <option value="SHARE" >SHARE</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Date</label>
            <input style={styles.input} type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>

          <button style={styles.button} type="submit">Add Members</button>
        </form>
        
      </div>
      {showMemberPopup && (
        <MemberPopup
          members={members}
          splitBy={splitBy}
          onClose={() => setShowMemberPopup(false)}
          onConfirm={async (splits) => {
            const savedExpense = await saveExpense(form);
            const expenseID2 = savedExpense.expenseID;
            const payload = {
              expenseID: expenseID2,
              splitBy: form.splitBy,
              splits: splits
            };
            await saveExpenseSplit(form.splitBy, payload);
            setShowMemberPopup(false);
            navigate("/groups");
          }}
        />
      )}
    </div>
  );
}
const styles = {
  dropdown: {
    position: "absolute",
    top: "40px",
    width: "100%",
    background: "white",
    border: "1px solid #ccc",
    listStyle: "none",
    padding: 0,
    margin: 0,
    maxHeight: "200px",
    overflowY: "auto"
  },
    page: {
      minHeight: "100vh",
      background: "#f4f6f8",
    },
    container: {
      maxWidth: 500,
      
      margin: "3rem auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      padding: "2rem 2.5rem",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "1.5rem",
      color: "#1f2937",
      
    },
    field: {
      marginBottom: "1.2rem",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.85rem",
      fontWeight: 500,
      marginBottom: "0.4rem",
      color: "#374151",
    },
    input: {
      padding: "0.6rem 0.8rem",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      fontSize: "0.95rem",
      outline: "none",
      transition: "border-color 0.2s",
    },
    select: {
      padding: "0.6rem 0.8rem",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      fontSize: "0.95rem",
      background: "#fff",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      marginTop: "0.5rem",
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.2s",
    },
  };