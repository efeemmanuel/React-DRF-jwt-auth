// ProtectedRoute.jsx

import React from "react";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({element})  {
    const isAuthenticated = localStorage.getItem("access_token");

    return isAuthenticated ? element : <Navigate to='/login' />
}



// ProtectedRoute is a function component that takes a single prop, element.
// element represents the React component that you want to protect (e.g., a dashboard, profile page, etc