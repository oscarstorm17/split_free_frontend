import ky from "ky";

export const deleteFriend = async (friendName) => {
    const token = localStorage.getItem("token");

    return await ky.delete("http://localhost:8080/friend/deleteFriend", {
        searchParams: { "friendName_": friendName },
        headers: { Authorization: `Bearer ${token}` }
    }).json();

};