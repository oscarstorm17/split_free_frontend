import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../elements/Navbar";

const styles = {
  page: { minHeight: "100vh", background: "#f4f6f8" },
  container: {
    maxWidth: 480,
    margin: "3rem auto",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "2rem 2.5rem",
  },
  heading: { fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem", color: "#1f2937" },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px solid #e5e7eb",
  },
  memberInfo: { display: "flex", alignItems: "center", gap: "0.6rem" },
  checkbox: { width: 18, height: 18 },
  valueInput: {
    width: 90,
    padding: "0.4rem 0.6rem",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: "0.9rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1.5rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default function ChooseParticipants() {
  const { state } = useLocation(); // { expenseID, splitBy, members: [...] }
  const navigate = useNavigate();
  const { expenseID, splitBy, members } = state || {};

  // selections[userID] = { checked: bool, value: string }
  const [selections, setSelections] = useState(
    members?.reduce((acc, m) => {
      acc[m.userID] = { checked: false, value: "" };
      return acc;
    }, {}) || {}
  );

  const toggleChecked = (userID) => {
    setSelections((prev) => ({
      ...prev,
      [userID]: { ...prev[userID], checked: !prev[userID].checked },
    }));
  };

  const updateValue = (userID, value) => {
    setSelections((prev) => ({
      ...prev,
      [userID]: { ...prev[userID], value },
    }));
  };

  const handleSubmit = async () => {
    const selectedUsers = Object.entries(selections).filter(([_, v]) => v.checked);

    const splits = selectedUsers.map(([userID, v]) => ({
      expense: { expenseID },
      user: { userID },
      splitValue: splitBy === "EQUAL" ? null : parseFloat(v.value),
    }));

    try {
      const res = await fetch("http://localhost:8080/expenseSplit/addAll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(splits),
      });
      if (!res.ok) throw new Error("Failed to save splits");
      navigate("/groups/" + state.groupID);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Choose participants</h2>

        {members?.map((m) => (
          <div style={styles.row} key={m.userID}>
            <div style={styles.memberInfo}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={selections[m.userID]?.checked || false}
                onChange={() => toggleChecked(m.userID)}
              />
              <span>{m.name}</span>
            </div>

            {splitBy !== "EQUAL" && selections[m.userID]?.checked && (
              <input
                type="number"
                placeholder={splitBy}
                style={styles.valueInput}
                value={selections[m.userID]?.value}
                onChange={(e) => updateValue(m.userID, e.target.value)}
              />
            )}
          </div>
        ))}

        <button style={styles.button} onClick={handleSubmit}>
          Confirm split
        </button>
      </div>
    </div>
  );
}