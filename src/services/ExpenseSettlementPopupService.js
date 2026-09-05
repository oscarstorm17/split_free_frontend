import ky from "ky";

export const getExpenseSettlementPopup = async (groupID) => {
  const token = localStorage.getItem("token");

  return await ky.get("http://localhost:8080/settlement/getSettlement", {
    searchParams:{groupID},
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).json();
};