import React from 'react'
// import axios from "axios"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className='home-title'>
        Welcome to Online Task Management System
      </h1>
      <h2 className='home-text'>Manage tasks, individually, or as a team</h2>
      <div className='home-login-signup'>
        <div className='home-signup'>
          <label className='home-label'>
            New user?
          </label>
          <Link to='/Signup'>Signup</Link>
        </div>

        <div className='home-login'>
          <label className='home-label'>Existing user?</label>
          <Link to='/Login'>Login</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home