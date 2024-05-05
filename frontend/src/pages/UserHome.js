import React from 'react'
import axios from 'axios'
import {Outlet, useNavigate} from 'react-router-dom';

import UserHomeNav from '../components/UserHomeNav';
import { getUserInfo } from '../utils/getUserInfo';
import Cookies from 'js-cookie'


const UserHome = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        Cookies.remove('userInfo');
        navigate("/")
    }

    return (
        <div>
            <header className='user-home-header'>
                <h1 className='welcome-title'>Welcome user</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <UserHomeNav />
            <Outlet />
        </div>
    )
}

export default UserHome