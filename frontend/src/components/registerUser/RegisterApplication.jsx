import React, { useState } from 'react';
import axios from 'axios';
import './registerapp.css'
import { useNavigate } from 'react-router-dom';

const RegisterApplication = () => {
      const navigate =useNavigate()
      const [app_name ,setApp_name]=useState("")
      const [image ,setImage]=useState("")
      const [url ,setUrl]=useState("")
      const [app_category ,setApp_Category]=useState("")
      const [description ,setDescription]=useState("")
    
 
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData1=new FormData()

        try {
          const formData=new FormData()
          formData.append("app_name",app_name)
          formData.append("image",image ,image.name)
          formData.append("url",url)
          formData.append("app_category",app_category)
          formData.append("description",description)

          const response = await axios.post('http://localhost:8000/api/v1/auth/register/application', formData);
          if (response.status === 200){
            navigate('/profile')
          }
          else{
            navigate('/register/application')
          }
         
        } catch (error) {
          console.error('Error registering application:', error);
        }
      };
    return (
      <div className='content section'>
            <div className="content">

            <h2>Register New Application</h2>
            {/* <p style={{color:"red"}}>{error? error:""}</p> */}
            <div className="form-container">
      <form onSubmit={handleSubmit}>
    <div className="item">
      <label>Application Name:</label>
      <input 
      type="text"
      name="app_name"
      value={app_name}
      onChange={(e)=>setApp_name(e.target.value)} 
      required
      />

    </div>
    <div className="item">
      <label >Image:</label>
      <input 
       type="file"
      name="image"
      onChange={(e)=>setImage(e.target.files[0])}
      required
      />
    </div>
    <div className="item">
      <label >Url Address:</label>
      <input 
      type="text"
      name="url"
      value={url}
      onChange={(e)=>setUrl(e.target.value)}
      required
      />
    </div>
    <div className="item">
      <label > Category:</label>
      <select
            name='app_category'
            value={app_category}
            onChange={(e) => setApp_Category(e.target.value)}
            required
          >
            <option value=''>Select category</option>
            <option value='Production'>Production</option>
            <option value='Reporting'>Reporting</option>
            <option value='Others'>Others</option>
            <option value='Communication'>Communication</option>
      </select>
    </div>
    <div className="item">
      <label >Description:</label>
      <textarea name="description" value={description}onChange={(e)=>setDescription(e.target.value)} required />

    </div>
    <input type="submit" className="submitbutton" value="Submit" />
  </form>
</div>





            </div>
        </div>
    );
}

export default RegisterApplication;
