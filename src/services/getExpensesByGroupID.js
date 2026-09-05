import ky from "ky";

export const getExpenses = async (groupID) => {
    const token = localStorage.getItem("token");
    
    return await ky
        .get(`http://localhost:8080/e/getExpenses`, {
            searchParams: {group_id_: groupID},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .json();
};