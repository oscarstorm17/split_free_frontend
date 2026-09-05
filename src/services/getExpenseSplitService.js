import ky from "ky";

export const getExpensesSplit = async (expenseID) => {
    const token = localStorage.getItem("token");
    
    return await ky
        .get(`http://localhost:8080/expenseSplit/expenseid`, {
            searchParams: {id_: expenseID},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .json();
};