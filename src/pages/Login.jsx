import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(username, password);
      // assuming backend returns: { token: "jwt_token_here" }
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", data.username);  
      navigate("/home");
    } 
    catch (err) {
      console.error(err);
      if(err.response.status===404)
        setError("Invalid username or password");
      else
        setError("Internal Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login to Split Free</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
        <button type="button" style={styles.button}
          onClick={()=> navigate("/signup")}>
          Signup
        </button>
      </form>
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
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
};