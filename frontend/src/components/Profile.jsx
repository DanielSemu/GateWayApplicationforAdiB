import React ,{useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
    const navigate =useNavigate()
    const user =JSON.parse(localStorage.getItem('user'))
    const jwt_access=localStorage.getItem('access')

    useEffect(()=>{
        if (jwt_access === null && !user){
            navigate('/login')
        }
        else{
            getSomeData()
        }
    }, [jwt_access,user])
    const getSomeData = async()=>{
        const resp =await axiosInstance.get("/auth/profile/")
        if(resp.status ===200){
            console.log(resp.data)
        }
    }

    const handleLogout= async ()=>{
        const res=await axiosInstance.post("/auth/logout/",{"refresh_token":refresh})
        if (res.status === 200){
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            localStorage.removeItem("user")
            navigate('/login')
        }
    }
    return (
        <div>
            <h2>Hi { user.names}</h2>
            <p>Wello Come to Your Profile</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
