import React, {useState, useEffect} from 'react'
import logo1 from "../../assets/logo1.png"
import './navbar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [isLoggedin, setLoggin] = useState(false)
  const [logindata, setLoginData]=useState({
    email:"",
    password:""
})
const [error, setError]=useState("")
const jwt_access=localStorage.getItem('access')
useEffect(()=>{
    if(jwt_access ===null){
        setLoggin(false)
    }
    else{
        setLoggin(true)
    }
},[jwt_access])
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
            handleCloseClick()
            setLoggin(true)
            navigate('/profile'); // Change '/login' to the appropriate route
        } else {
            setError("Invalid Credential")
            console.log("Account creation failed");
        }
    } catch (error) {
        setError("Invalid Credential")
        console.error('Error creating account:', error);
    }
}
}






  // const [error, setError] = useState('');
  
  const handleLoginClick = () => {
    setShowPopup(true);
  };
  const handleCloseClick = () => {
    setShowPopup(false);
    setLoginData({ ...logindata, email: "" });
    setLoginData({ ...logindata, password: "" });
   
  };

  
const refresh =JSON.parse(localStorage.getItem('refresh'))
  const handleLogout= async ()=>{
     
      const res=await axiosInstance.post("/auth/logout/",{"refresh_token":refresh})
      if (res.status === 200){
          localStorage.removeItem("access")
          localStorage.removeItem("refresh")
          localStorage.removeItem("user")
          navigate('/')
      }
  }



  

  return (
    <nav className='navbar'>
        <div className="logo">
            <img src={logo1} alt="" />
        </div>
        <div className="name">
                <h1>Addis International Bank S.c</h1>
        </div>
        <div className="login-container">
          {isLoggedin ?
          <button className='login_button btn' onClick={handleLogout} >Logout</button>:<button className='login_button btn' onClick={handleLoginClick}>Sign in</button>
        }
       
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleCloseClick}>&times;</span>
            <h2 className='login_title'>Login</h2>
            <p style={{color:"red"}}>{error? error:""}</p>
            <form className='login_form' onSubmit={handleSubmit} >
             <div className="inputs">
              <div className="username_container">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="email"
                value={logindata.email}
                onChange={handleOnChange}
                placeholder='Username...'
                required
              />
             </div>
             <div className="password_container">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={logindata.password}
                onChange={handleOnChange}
                placeholder='Password...'
                required
              />
              </div>
              </div>
              <input className='btn submit' type="submit" value="Login" />
            </form>
          </div>
        </div>
      )}
    </div>
        
    </nav>
   
 
  )
}

export default Navbar