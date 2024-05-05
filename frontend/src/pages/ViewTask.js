import React from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import axios from 'axios'

import BackButton from '../components/BackButton'
import { requireAuth } from '../utils/requireAuth'
import { getUserInfo } from '../utils/getUserInfo'


export async function loader({ params }) {
    await requireAuth()
    const userTokenHeader = await getUserInfo()
    const { id } = params
    // console.log(id);
    const data = axios
        .get(`http://localhost:4000/api/task/${id}`, userTokenHeader)
        .then((response) => {
            // console.log(response.data.task)
            return response.data
        })
        .catch((error) => {
            // setErrorMsg(error.response.data)
            console.log(error);
        })
    return data
  }

const ViewTask = () => {
    const data = useLoaderData()
    // console.log(data);
    return (
        <div>
            <BackButton />
            <div className='task-card-info'>
                <h3>Title: {data.task.title}</h3>
                <p>Description: {data.task.description}</p>
                <p>Priority Level: {data.task.priorityLvl}</p>
                <p>Due Date: {data.task.dueDate.substring(0,10)}</p>
                <p>Progress: {data.task.progress}</p>
                <p>Category: {data.task.category ? data.category.title : "No Category"}</p>
                <p>Project: {data.task.project ? data.project.title : "No Project"}</p>
            </div>
        </div>
    )
}

export default ViewTask