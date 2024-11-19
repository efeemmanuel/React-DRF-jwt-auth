import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", credentials);
      const { access } = response.data;

      const decodetoken = jwtDecode(access);
      // console.log("Decoded token:", decodetoken); // For debugging
      
      const userRole = decodetoken.roles;
      // console.log("User role:", userRole); // For debugging

      // Store the access token in localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("user_role", userRole);
      
      // Update the authentication state
      setIsAuthenticated(true);

      // Role-based navigation
      switch (userRole) {
        case "customer":
          navigate("/dashboard");
          break;
        case "provider":
          navigate("/providerstats");
          break;
        default:
          setError("Invalid user role");
          setIsAuthenticated(false);
          localStorage.clear();
          return;
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;