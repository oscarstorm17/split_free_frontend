import ky from "ky";

export const saveExpenseSplit = async (type, expenseSplit_) => {
    const token = localStorage.getItem("token");

    const response = await ky.post(`http://localhost:8080/expenseSplit/saveExpenseSplit/save`,
        {
            json: expenseSplit_,
            headers: {Authorization: `Bearer ${token}`}}
    ).json();
    
    return response;
}

