import React ,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate =useNavigate()
    const [formdata, setFormData]=useState({
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        password2:'',
    })
    const [error ,setError]=useState("")
    const {email,first_name,last_name,password,password2}=formdata
    const handleOnChange =(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !first_name || !last_name || !password || !password2) {
            setError("All Fields are required");
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:8000/api/v1/auth/register/",
                    formdata // Passing formdata directly as the request body
                );
                if (res.status === 201) {
                    console.log("Account created successfully");
                    // Redirect user to another page upon successful registration
                    navigate('/login'); // Change '/login' to the appropriate route
                } else {
                    console.log("Account creation failed");
                }
            } catch (error) {
                console.error('Error creating account:', error);
            }
        }
    };
    
    return (
        <div className='container section'>
            <h2>Create Account</h2>
            <p style={{color:"red"}}>{error? error:""}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label><br/>
                <input 
                type="email"
                 name="email" 
                 value={email} 
                 onChange={handleOnChange}

                 /><br />
                <label htmlFor="">First Name</label><br/>
                <input 
                type="text"
                 name="first_name" 
                 value={first_name}
                 onChange={handleOnChange}
                  /><br/>
                <label htmlFor="">Last Name</label><br/>
                <input 
                type="text" 
                name="last_name" 
                value={last_name}
                onChange={handleOnChange}
                 /><br/>
                <label htmlFor="">Password</label><br/>
                <input
                 type="password"
                  name="password"
                   value={password}
                   onChange={handleOnChange}
                   /><br/>
                <label htmlFor="">Confirm Password</label><br/>
                <input 
                    type="password" 
                    name="password2"  // Corrected name to match the state
                    value={password2}
                    onChange={handleOnChange}
                />
                <br/>
                <input type="submit" className='bt' value="Submit" />
            </form>
            
        </div>
    );
}

export default SignUp;
