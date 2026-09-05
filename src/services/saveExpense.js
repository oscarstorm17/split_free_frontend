import ky from "ky";

export const saveExpense = async (expense_) => {
    const token = localStorage.getItem("token");

    const response = await ky.post("http://localhost:8080/e/addExpense",
        {
            json: expense_,
            headers: {Authorization: `Bearer ${token}`}}
    ).json();
    
    return response;
}

