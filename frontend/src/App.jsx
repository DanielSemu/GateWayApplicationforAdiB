import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Login, Profile } from './components'
import SignUp from './components/registerapplication/SignUp'
import Navbar from './components/navbar/Navbar'
import Applications from './pages/applications/Applications'
import RegisterApplication from './components/registerUser/RegisterApplication'
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
          <Route path='/register/application' element={<RegisterApplication/>}/>
          <Route path='/register/admin' element={<SignUp />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
