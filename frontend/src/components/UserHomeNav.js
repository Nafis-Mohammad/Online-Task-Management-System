import React from 'react'
import { NavLink } from 'react-router-dom'

const UserHomeNav = () => {

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: 'indigo'
    }

    return (
        <div>
            <nav className='user-home-nav'>
                <NavLink
                    to="/userHome"
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="category"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Category
                </NavLink>

                <NavLink
                    to="project"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Project
                </NavLink>
            </nav>
        </div>
    )
}

export default UserHomeNav