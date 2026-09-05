import ky from 'ky';


export const loginUser = async (username, password) => {
  //document.write(username);
  //document.write(password);
  const response = await ky.post('http://localhost:8080/controller/checklogin', 
    {
      json: { 
        username, password 
      }
    }
  ).json();


  return response; // expecting JWT token in response
};