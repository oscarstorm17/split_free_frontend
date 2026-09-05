import ky from "ky";

export const searchUsers = async (query) => {
  const token = localStorage.getItem("token");

  return await ky.post("http://localhost:8080/friend/findNewFriends", {  //returns a list of users
    searchParams: { query_: query },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).json();
};