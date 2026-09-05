import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"


const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken]= useState("");
  const [user, setUser]= useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("groupID");
    localStorage.removeItem("expenseID");
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(()=> {
    const temp = localStorage.getItem("currentUser");
    setUser(temp);
  }, []) ;

  return (
    <nav style={styles.nav}>
      {/* <h2 style={styles.logo} onClick={()=> {navigate("/")}}>Split Free</h2> */}
      <div style={styles.links} >
        <Link to="/home" style={styles.logo}>Split_Free</Link>
      </div>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/groups" style={styles.link}>Groups</Link>
        <Link to="/myFriends" style={styles.link}>Friends</Link>
        <Link to="/account" style={styles.link}>Account</Link>
        
        <button onClick={handleLogout} style={styles.logout}
        onMouseEnter={(e) => {e.target.style.background = "red"; e.target.style.color="white";}}
        onMouseLeave={(e) => {e.target.style.background = "white"; e.target.style.color="black";}}
        >Logout</button>
      </div>
    </nav>
  );
};
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1f2937",
    padding: "12px 20px",
    color: "white",
    width: "100%",              // ✅ full width
    position: "fixed",          // ✅ stick to top
    top: 0,
    left: 0,
    boxSizing: "border-box",    // ✅ prevent overflow
    zIndex: 1000
  },
  logo: {
    margin: "0px",
    padding: "5px",
    width: "justifyContent",
    backgroundColor: "white",
    textDecoration: "none",
    color: "black",
    borderRadius: "5px",
    
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },
  logout: {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    background: "white",
    transition:"0.3s"
  }
};
export default Navbar;