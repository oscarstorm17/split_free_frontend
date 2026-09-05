import { useState } from "react";

export default function MemberPopup({
    members, splitBy, onClose, onConfirm
}) {

    const [selectedMembers, setSelectedMembers] = useState({});
    const [splitValues, setSplitValues] = useState({});
    const toggleMember = (member) => {
        setSelectedMembers(prev => ({
            ...prev,
            [member]: !prev[member]
        }));
    };

    const handleValueChange = (member, value) => {
        setSplitValues(prev => ({
            ...prev,
            [member]: value
        }));
    };

    const handleConfirm = () => {
        const splits = Object.keys(selectedMembers)
            .filter(member => selectedMembers[member])
            .map(member => ({
                userName: member,
                value:
                    splitBy === "EQUAL"
                        ? 0
                        : parseFloat(splitValues[member] || 0)
            }));
        onConfirm(splits);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h3>Select Members</h3>
                {members.map(member => (
                    <div key={member} style={styles.row}>
                        <input
                            type="checkbox"
                            checked={selectedMembers[member] || false}
                            onChange={() => toggleMember(member)}
                        />
                        <span style={styles.name}>
                            {member}
                        </span>
                        {selectedMembers[member] && splitBy !== "EQUAL" && (
                            <input
                                type="number"
                                required
                                placeholder={
                                    splitBy === "PERCENT"
                                        ? "%"
                                        : splitBy === "EXACT"
                                            ? "Amount"
                                            : "Shares"
                                }
                                value={splitValues[member] || ""}
                                onChange={(e) =>
                                    handleValueChange(
                                        member,
                                        e.target.value
                                    )
                                }
                                style={styles.input}
                            />
                        )}
                    </div>
                ))}

                <div style={styles.buttons}>
                    <button onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={handleConfirm}>
                        Save
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
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    popup: {
        background: "white",
        padding: 25,
        borderRadius: 10,
        width: 400
    },

    row: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 10
    },

    name: {
        width: 120
    },

    input: {
        width: 120,
        padding: 5
    },

    buttons: {
        marginTop: 20,
        display: "flex",
        justifyContent: "flex-end",
        gap: 10
    }
};