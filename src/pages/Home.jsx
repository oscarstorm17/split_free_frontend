import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../elements/Navbar";

const Home = () => {
    return (
      <div>
        <Navbar />
  
        <div style={styles.container}>
          <h2 style={styles.heading}>Dashboard</h2>
  
                <div style={styles.grid}>
                    <Link
                        to="/createGroup"
                        style={styles.card}
                        onMouseEnter={(e) => e.target.style.background = "#473141"}
                        onMouseLeave={(e) => e.target.style.background = "#1f2937"}
                    >
                        Create New Group
                    </Link>

                    <Link
                        to="/groups"
                        style={styles.card}
                        onMouseEnter={(e) => e.target.style.background = "#473141"}
                        onMouseLeave={(e) => e.target.style.background = "#1f2937"}
                    >
                        My Groups
                    </Link>

                    <Link
                        to="/addFriend"
                        style={styles.card}
                        onMouseEnter={(e) => e.target.style.background = "#473141"}
                        onMouseLeave={(e) => e.target.style.background = "#1f2937"}
                    >
                        Add Friends
                    </Link>

                    <Link
                        to="/myFriends"
                        style={styles.card}
                        onMouseEnter={(e) => e.target.style.background = "#473141"}
                        onMouseLeave={(e) => e.target.style.background = "#1f2937"}
                    >
                        My friends
                    </Link>
          </div>
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      marginTop: "20px",
      textAlign: "center"
    },
  
    heading: {
      marginBottom: "20px",
      textAlign:"center",
      fontSize: "24px"
    },
  
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      width: "60%",
      
    },
  
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
      background: "#1f2937",
      color: "white",
      textDecoration: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "500",
      transition: "0.2s",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }
  };

export default Home;