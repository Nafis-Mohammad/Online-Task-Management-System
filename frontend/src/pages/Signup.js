import React from 'react'
import { Form, redirect } from 'react-router-dom'
import axios from 'axios'

import BackButton from '../components/BackButton'


export async function handleSignup({ request }) {
	const userFormData = await request.formData()
	const userName = userFormData.get("userName")
	const password = userFormData.get("password")
	const userData = {
		userName,
		password
	}
	const msg = axios
		.post('http://localhost:4000/api/user/signup', userData)
		.then(() => {
			return redirect('..')
		})
		.catch((error) => {
			// setErrorMsg(error.response.data)
			console.log(error.response.data);
		})
	return msg
}

const Signup = () => {
	return (
		<div>

		<BackButton />

		{/* { errorMsg && <h3 className='error-message'> {errorMsg} </h3> } */}

		<div className='form-div'>
			<Form className='signup-form' method='post'>
				<label className='form-username' htmlFor='username'>Username</label>
				<input
					id='username'
					name='userName'
					type='text'
					required
				/>

				<label className='form-password' htmlFor='password'>Password</label>
				<input
					id='password'
					name='password'
					type='password'
					required
				/>

				<button 
					type='submit'
					className='signup-button'
				>
					Signup
				</button>
			</Form>
		</div>

		</div>
	)
}

export default Signup