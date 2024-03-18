import React ,{useState} from 'react';
import axios from 'axios';
import './signup.css'
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
                console.log("already exist")
                if (res.status === 201) {
                    console.log("Account created successfully");
                    // Redirect user to another page upon successful registration
                    navigate('/profile'); // Change '/login' to the appropriate route
                } else {
                    console.log("Account creation failed");
                }
            } catch (error) {
                setError("Check the Password to be the same");
                console.error('Error creating account:', error);
            }
        }
    };
    
    return (
        <div className='content section'>
            <div className="content">

            <h2>Create Account</h2>
            <p style={{color:"red"}}>{error? error:""}</p>
            <div className="form-container">
  <form onSubmit={handleSubmit}>
    <div className="item">
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={email} onChange={handleOnChange} />
    </div>
    <div className="item">
      <label htmlFor="first_name">First Name:</label>
      <input type="text" name="first_name" value={first_name} onChange={handleOnChange} />
    </div>
    <div className="item">
      <label htmlFor="last_name">Last Name:</label>
      <input type="text" name="last_name" value={last_name} onChange={handleOnChange} />
    </div>
    <div className="item">
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" value={password} onChange={handleOnChange} />
    </div>
    <div className="item">
      <label htmlFor="password2">Confirm Password:</label>
      <input type="password" name="password2" value={password2} onChange={handleOnChange} />
    </div>
    <input type="submit" className="submitbutton" value="Submit" />
  </form>
</div>





            </div>
        </div>
    );
}

export default SignUp;
