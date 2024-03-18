import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Login, Profile, SignUp } from './components'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
