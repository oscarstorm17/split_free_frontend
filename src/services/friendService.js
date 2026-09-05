import ky from "ky"


//return a list of friend objects with id column = id
//[ {"user1": "user2","user2": "user1","id": 1} ] 

export const fetchFriends = async() => {
    const token = localStorage.getItem("token");
    const response = await ky.get('http://localhost:8080/friend/fetchFriends',
    {headers: {Authorization: `Bearer ${token}`}}).json();
    return response;

}