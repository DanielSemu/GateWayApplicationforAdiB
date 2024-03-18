import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate =useNavigate()
    const [logindata, setLoginData]=useState({
        email:"",
        password:""
    })
    const [error, setError]=useState("")
    const handleOnChange=(e)=>{
        setLoginData({...logindata,[e.target.name]:e.target.value})
    }
const handleSubmit = async (e) =>{
    e.preventDefault()
    const {email,password}=logindata
    if(!email || !password){
        setError("Email and passowrd are Required")
    }
    else{
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/auth/login/",
                logindata // Passing formdata directly as the request body
            );
            const response=res.data
            const user ={
                "email":response.email,
                "names":response.full_name,
            }
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("access", JSON.stringify(response.access_token))
                localStorage.setItem("refresh", JSON.stringify(response.refresh_token))
                navigate('/profile'); // Change '/login' to the appropriate route
            } else {
                console.log("Account creation failed");
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    }
}

    return (
        <div>
            <h2>Login</h2>
            <p style={{color:"red"}}>{error? error:""}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label><br />
                <input 
                type="email" 
                name='email' 
                value={logindata.email}
                onChange={handleOnChange}
                /><br />
                <label htmlFor="">Password</label><br />
                <input
                type="password"
                name='password'
                value={logindata.password}
                onChange={handleOnChange}
                /><br />
                <input type="submit" value='Submit' />
            </form>
        </div>
    );
}

export default Login;
