import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "../elements/Navbar";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/controller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      alert("Signup successful");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div> 
    <div style={styles.container} >
      

      <form onSubmit={handleSignup} style={styles.form}>
      <h2>Signup</h2>
        <div>
          
          <input
            type="text"
            placeholder="USERNAME"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          
          <input
            type="email"
            placeholder="EMAIL"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          
          <input
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit">Signup</button>

        <button type="button" style={styles.signinButton}
            onClick={()=> navigate("/")}> Back to Signin</button>
      </form>
    </div>
    </div>
  );
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
      gap: "10px",
    },
    input: {
      padding: "8px",
       with:"300px"
    },
    button: {
      padding: "10px",
      cursor: "pointer",
    },
    signinButton:{
        padding: "10px",
        cursor: "pointer",
        
    }
  };

export default Signup;