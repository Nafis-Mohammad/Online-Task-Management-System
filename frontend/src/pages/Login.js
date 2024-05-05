import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom'
import axios from 'axios'

import { setUserInfo } from '../utils/setUserInfo'
import BackButton from '../components/BackButton'


export async function handleLogin({ request }) {
	const userFormData = await request.formData()
	const userName = userFormData.get("userName")
	const password = userFormData.get("password")
	const userData = {
		userName,
		password
	}

	const response = await axios
		.post('http://localhost:4000/api/user/login', userData)
		.then((response) => {
			// console.log(response);
			return response
			// return redirect('/userHome')
		})
		.catch((error) => {
			console.log(error.response.data);
			return error.response.data
		})
	// response.headers.authorization = `Bearer ${response.data.token}`
	// console.log(response);

	if(response.data) {
		setUserInfo(response)
		return redirect("/userHome")
	}
	else{
		return response
	}
	}
	

const Login = () => {
	const msg = useActionData()
	// console.log(msg);
	return (
		<div>

		<BackButton />

		{ msg && <h3 className='error-message'> {msg} </h3> }

		<div className='form-div'>
			<Form className='login-form' method='post'>
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
					className='login-button'
				>
					Login
				</button>
			</Form>
		</div>

		</div>
	)
}

export default Login