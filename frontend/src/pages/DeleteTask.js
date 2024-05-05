import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import BackButton from '../components/BackButton'
import { getUserInfo } from '../utils/getUserInfo'


const DeleteTask = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDeleteTask = async () => {
        const userTokenHeader = await getUserInfo()
        const msg = await axios
            .delete(`http://localhost:4000/api/task/${id}`, userTokenHeader)
            .then((response) => {
                console.log("Successfully deleted")
                navigate("..")
            })
            .catch((error) => {
                // setErrorMsg(error.response.data)
                console.log(error);
            })
        return msg
    }

    return (
        <div>
            <BackButton />
            <div className='delete-task'>
                <h3 className='delete-task-warning'>Are you sure you want to delete this task?</h3>
                <button className='delete-task-button' onClick={handleDeleteTask}>Yes, Delete Task</button>
            </div>
        </div>
    )
}

export default DeleteTask