import ky from "ky";

export const createGroup = async (groupData) => {
  const token = localStorage.getItem("token");

  return await ky.post("http://localhost:8080/group/saveGroup", {
    json:groupData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).json();
};