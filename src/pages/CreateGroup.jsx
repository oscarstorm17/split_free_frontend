import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createGroup} from "../services/createGroupService";
import Navbar from "../elements/Navbar"
import {fetchFriends} from '../services/friendService'
import { toast } from "react-toastify";



const CreateNewGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [friends, setFriends] = useState([]);                 //list of friends object
    const [selectedMembers, setSelectedMembers] = useState([]); // list of strings
    const [error, seterror] = useState("");
  
    const admin = localStorage.getItem("currentUser");
    
    useEffect(() => {
      fetchFriends()            //returns a list of friends object
        .then((data) => { setFriends(data) })
        .catch(console.error);
    }, []);
  
    const handleCheckboxChange = (username) => {
      setSelectedMembers((prev) =>
        prev.includes(username)
          ? prev.filter((u) => u !== username)
          : [...prev, username]
      );
    };
    const handleSubmit = async () => {
      const groupData = {
        groupName,
        admin,
        members: selectedMembers
      };
  
      try {
        await createGroup(groupData);
        toast.success("Group Created");
        seterror("")
  
      } catch (err) {
        console.error(err);
        if(err.response.status === 400) seterror("Invalid Field");
        else seterror("Internal Server Error");
      }
      finally{
        setGroupName("");
        setSelectedMembers([]);
        // seterror("")
      }
    };
  
    return (
      <div>
        <Navbar />
  
        <div style={styles.container}>
          <h2>Create New Group</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Group Name */}
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            required
            onChange={(e) => setGroupName(e.target.value)}
            style={styles.input}
          />
  
          {/* Admin (readonly) */}
          <input
            type="text"
            value={admin}
            disabled
            style={styles.input}
          />
  
          {/* Friends list */}
          <div style={styles.list}>
            <h4>Select Members</h4>
            {
              friends.length===0 ?
              (<p>No Friends Found</p> ) : 
              (
                  <ul>
                    {friends.map((friend) => (
                      <div key={friend.id} style={styles.item}>
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(friend.user2)}
                          onChange={() => handleCheckboxChange(friend.user2)}
                        />
                        <span>{friend.user2}</span>
                      </div>
                    ))}
                  </ul>
              )
          }
          </div>
          <button onClick={handleSubmit} style={styles.button}>
            Create Group
          </button>
        </div>
      </div>
    );
  };
  const styles = {
    container: {
      marginTop: "80px",
      textAlign: "center"
    },
    input: {
      display: "block",
      margin: "10px auto",
      padding: "8px",
      width: "250px"
    },
    list: {
      margin: "20px auto",
      width: "250px",
      textAlign: "left"
    },
    item: {
      margin: "5px 0"
    },
    button: {
      padding: "10px 15px",
      cursor: "pointer"
    }
  };
  
  export default CreateNewGroup;