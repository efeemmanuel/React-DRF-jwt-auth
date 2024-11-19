import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'; 



export default function Home(){

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        username: "",
        password: "",
        roles:"provider" 
    });


    // form event handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
      };


      
    // for submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            // add your api endpoint here 
            const response = await axios.post('http://127.0.0.1:8000/api/register/'   ,inputs);
            alert('Form submitted successfully', response.data);
            navigate("/login"); // Navigate to login page after successful registration
        }catch (error){
            alert('Error while submitting form',error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter first name
                <input
                    type="text"
                    name="first_name"
                    value={inputs.first_name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Enter last name
                <input
                    type="text"
                    name="last_name"
                    value={inputs.last_name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Enter email
                <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                />
            </label>



            <label>
                Enter Phone number
                <input
                    type="number"
                    name="phone_number"
                    value={inputs.phone_number}
                    onChange={handleChange}
                />
            </label>
            
            <label>who are you</label>
            <select 
            name="roles"  
            value={inputs.roles} 
            onChange={handleChange}
            >
            <option value="customer">customer</option>
            <option value="provider">provider</option>
            
            </select>
            
            <label>
                Enter username
                <input
                    type="text"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                />
            </label>



            <label>
                Enter Password
                <input
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Submit</button>

        </form>
    )
}