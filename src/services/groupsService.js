import ky from "ky";

export const getGroups = async () => {
    const token = localStorage.getItem("token");

    const response = await ky.get("http://localhost:8080/group/getAllGroups",
        {headers: {Authorization: `Bearer ${token}`}}
    ).json();

    return response;
}

