import { useEffect, useState } from "react";
import { fetchFriends } from "../services/friendService";
import Navbar from "../elements/Navbar";
import { deleteFriend } from '../services/deleteFriend'

const MyFriends = () => {
    const myName = localStorage.getItem("currentUser");
    const [error, setError] = useState("");
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        //fetch Friends
        fetchFriends().then((data) => {
            setFriends(data)
        }).catch((err) => {
            console.error(err);
            setError("Internal Server Error");
        });
    }, []);

    const handleDeleteFriend = async (friendName) => {
        try {
            deleteFriend(friendName);
            // fetchFriends().then((data) => {
            //     setFriends(data)
            // });
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={styles.page}>
            <Navbar />

            <h2 style={styles.heading}>Your Friends</h2>

            {error && <p style={styles.error}>{error}</p>}

            {friends.length === 0 ? (
                <p style={styles.noFriends}>No Friends Found</p>
                ) : (
                <ul style={styles.list}>
                    {friends.map((friend) => (
                        <li key={friend.id} style={styles.row}>
                            <span style={styles.friendName}>{friend.user2}</span>

                            {/* <button
                                style={styles.deleteButton}
                                onClick={() => handleDeleteFriend(friend.user2)}
                                >
                                Delete
                            </button> */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}
const styles = {
    page: {
        minHeight:"100vh",
        //backgroundColor: "#f4f6f9",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        margin :"10px",
    },

    heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "25px",
    },

    error: {
        color: "red",
        textAlign: "center",
        marginBottom: "15px",
    },

    noFriends: {
        textAlign: "center",
        color: "#666",
        fontSize: "18px",
        marginTop: "40px",
    },

    list: {
        listStyle: "none",
        padding: 0,
        maxWidth: "80%",
        
        margin: "0 auto",
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "15px 20px",
        marginBottom: "12px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },

    friendName: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
    },

    deleteButton: {
        backgroundColor: "#e53935",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
    },
};
export default MyFriends;