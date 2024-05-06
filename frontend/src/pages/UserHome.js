import React from 'react'
import axios from 'axios'
import {Outlet, useNavigate, useLoaderData} from 'react-router-dom';

import { requireAuth } from '../utils/requireAuth';
import UserHomeNav from '../components/UserHomeNav';
import { getUserInfo } from '../utils/getUserInfo';
import Cookies from 'js-cookie'


export async function loader() {
    await requireAuth()
    const userTokenHeader = await getUserInfo()
    const userName = await axios
        .get('http://localhost:4000/api/user', userTokenHeader)
        .then((response) => {
        //   console.log(response)
          return response.data.userName
        })
        .catch((error) => {
        //   setErrorMsg(error.response.data)
        //   console.log(error.response.data.error);
          return error.response.data
        })
    return userName
}

const UserHome = () => {
    const userName = useLoaderData()

    const navigate = useNavigate()

    const handleLogout = async () => {
        Cookies.remove('userInfo');
        navigate("/")
    }

    return (
        <div>
            <header className='user-home-header'>
                <h1 className='welcome-title'>Welcome {userName}</h1>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            </header>
            <UserHomeNav />
            <Outlet />
        </div>
    )
}

export default UserHome