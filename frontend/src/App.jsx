import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Login, Profile, SignUp } from './components'
import Navbar from './components/navbar/Navbar'
import Applications from './pages/applications/Applications'
import RegisterUser from './components/registerUser/RegisterUser'
// import Applications from './pages/applications/Applications'
function App() {


  return (
    <>
    
      <Router>
      <Navbar/>
  
      
        <Routes>
          
          <Route path='/' element={<Applications/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/register/application' element={<SignUp/>}/>
          <Route path='/register/admin' element={<RegisterUser/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
