import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './pages/Logout.jsx';





export default function App(){


    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Check for the token when the component mounts to set initial authentication state
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token); // Set state based on token presence
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/logout' element={<ProtectedRoute element={<Logout />} />} />

            </Routes>
        </Router>
    )
}