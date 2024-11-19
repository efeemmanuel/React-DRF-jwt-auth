// src/pages/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");

    // Optionally, you could clear any other user data if needed:
    // localStorage.removeItem("user_data");

    // Redirect the user to the login page after logout
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
