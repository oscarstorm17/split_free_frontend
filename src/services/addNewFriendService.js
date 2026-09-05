import ky from "ky";

export const addFriend = async (friendData) => {
    const token = localStorage.getItem("token");
  
    return await ky.post("http://localhost:8080/friend/addFriend", {
      json: friendData,
      headers: {Authorization: `Bearer ${token}`}
    }).json();
  };