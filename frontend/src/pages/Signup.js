import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'

const Signup = () => {
  const [userFormData, setUserFormData] = React.useState(
    {userName: "", password: ""}
  )

  function handleChange(event) {
    setUserFormData(prevUserFormData => {
      return {
        ...prevUserFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const navigate = useNavigate()

  const handleUserSignup = (event) => {
    event.preventDefault()
    const userName = userFormData.userName
    const password = userFormData.password
    const userData = {
      userName,
      password
    }
    axios
      .post('http://localhost:4000/api/user/signup', userData)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert("Error signing up")
        console.log(error);
      })
  }
    


  return (
    <div>

      <BackButton />

      <div className='form-div'>
        <form className='signup-form' onSubmit={handleUserSignup}>
          <label className='form-username' htmlFor='username'>Username</label>
          <input
            id='username'
            name='userName'
            type='text'
            value={userFormData.userName}
            onChange={handleChange}
            required
          />

          <label className='form-password' htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={userFormData.password}
            onChange={handleChange}
            required
          />
          <button className='signup-button'>
            Signup
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default Signup