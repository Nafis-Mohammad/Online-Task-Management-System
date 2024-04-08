import './styles.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserHome from './pages/UserHome'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/userHome' element={<UserHome />} />
    </Routes>
  )
}

export default App