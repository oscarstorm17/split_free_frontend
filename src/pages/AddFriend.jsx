import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../elements/Navbar";
import { toast } from "react-toastify";
import { searchUsers } from "../services/searchNewFriendService"; //returns a list of users
import {addFriend} from "../services/addNewFriendService"
const AddFriend = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);  //stores obj.email, obj.password, obj.username, obj.id
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [myuser, setMyuser] = useState("");
  

  useEffect(()=> {
    const token = localStorage.getItem("token");
    setMyuser(localStorage.getItem("currentUser"));
    if(!token){
      navigate("/");
      return;
    } 
  }, []) ;

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const data = await searchUsers(value);
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFriendButton= async (friendName) => {
    try{
      const friendData = {
        user1: myuser,
        user2: friendName
      }
      await addFriend(friendData);
      toast.success("Friend Added");
      //below code is not working
      // setSuggestions(prev =>
      //   prev.filter(user => user.username !== username)
      // );
      setSuggestions([]);

    } catch (err) {
      console.error(err);
      if(err.response.status===409) setError("Friend Name cannot be same as your name");
      else if(err.response.status===406) setError("Friend already exists");
      else setError("Internal Server Error");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2>Add Friend</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search username..."
            value={query}
            onChange={handleChange}
            style={styles.input}
          />

          {suggestions.length > 0 && (
            <ul style={styles.dropdown}>
              {suggestions.map((user) => (
                <li key={user.id} style={styles.item}>
                  {user.username}
                  <button style={styles.addBtn} onClick={()=> handleAddFriendButton(user.username)}>Add</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "80px",
    textAlign: "center"
  },
  searchBox: {
    position: "relative",
    width: "300px",
    margin: "auto"
  },
  input: {
    width: "100%",
    padding: "8px"
  },
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
  item: {
    padding: "8px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee"
  },
  addBtn: {
    cursor: "pointer"
  }
};

export default AddFriend;