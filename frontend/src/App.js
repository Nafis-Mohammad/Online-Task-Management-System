// THIS FILE DOES NOTHING

import './styles.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserHome from './pages/UserHome'
import CreateTask, {handleCreateTask} from './pages/CreateTask'
import UpdateTask from './pages/UpdateTask'




const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/userHome' element={<UserHome />} >
        <Route index element={<Dashboard />} />
        <Route path='createTask' element={<CreateTask />} action={handleCreateTask} />
        <Route path='updateTask' element={<UpdateTask />} />
      </Route>
    </Routes>
  )
}
