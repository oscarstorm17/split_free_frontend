import ky from "ky";

export const getUser = async (username_) => {
    const token = localStorage.getItem("token");

    const response = await ky.post("http://localhost:8080/controller/getUser",
        {
            searchParams: {username_},
            headers: {Authorization: `Bearer ${token}`}}
    ).json();
    
    
    return response;
}

