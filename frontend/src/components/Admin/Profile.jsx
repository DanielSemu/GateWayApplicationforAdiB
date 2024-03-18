import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './profile.css'
const Profile = () => {
    const navigate = useNavigate();
    let [apllications, setApllications]=useState([])
    const newApplication =()=>{
        navigate('/register/application');
    }
    const newAdmin =()=>{
        navigate('/register/admin');
    }
    try {
        useEffect(()=>{
            getApllications() 
        },[])
        
          let getApllications = async ()=>{
           let response = await fetch('http://127.0.0.1:8000/api/v1/auth/applications/')
           let data = await response.json()
           setApllications(data)
        }
        } catch (error) {
          
        }
  return (
    <div className='admin_page section container'>
    <div className="head ">
        <h1>Wellcome to Admin Page</h1>
        <div className="buttons">
            <button className='btn add_new' onClick={newApplication}>New Application</button>
            <button className='btn add_new' onClick={newAdmin}>New Admin</button>
        </div>
        
    </div>
      
      <table>
      <thead>
        <tr>
          <th>Application Name</th>
          <th>Application Category</th>
          <th>Application URL</th>
          <th>Application Image</th>
          <th>Application Description</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {apllications.map((item) => (
          <tr key={item.id}>
            <td>{item.app_name}</td>
            <td>{item.app_category}</td>
            <td><a href={item.url} target='_blank'>Application Address</a></td>
            <td><a href={`http://127.0.0.1:8000/${item.image}`} target='_blank'>{item.app_name} Image</a></td>
            <td>{item.description}</td>
            <td className='operation'><button className='btn edit'>Edit</button>
            <button className='btn delete'>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Profile;
