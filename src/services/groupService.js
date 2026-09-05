import ky from "ky";

export const getGroup = async (id_) => {
    const token = localStorage.getItem("token");

    const response = await ky.get("http://localhost:8080/group/getGroupByGroupID",

        {
            searchParams: {id_: id_},
            headers: {Authorization: `Bearer ${token}`}}
    ).json();
    
    return response;
}

