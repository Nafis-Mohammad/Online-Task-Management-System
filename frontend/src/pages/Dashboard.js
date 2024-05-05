import React from 'react'
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom'

import TaskCard from '../components/TaskCard';
import { requireAuth } from '../utils/requireAuth';
import { getUserInfo } from '../utils/getUserInfo';


export async function loader() {
    await requireAuth()
    const userTokenHeader = await getUserInfo()
    const allTasks = await axios
        .get('http://localhost:4000/api/task', userTokenHeader)
        .then((response) => {
        //   console.log(response.data.tasks)
          return response.data.tasks
        })
        .catch((error) => {
          // setErrorMsg(error.response.data)
          console.log(error.response.data.error);
        //   return error.response.data
        })
    return allTasks
}


const Dashboard = () => {
    const tasks = useLoaderData()
    const taskElements = tasks.map(singleTask => (
        <TaskCard key={singleTask._id} {...singleTask} />
    ))
    return (
        <div>
            <header className='dashboard-header'>
                <h2 className='dashboard-title'>All Tasks</h2>
                <Link className='create-task' to="createTask">Create New Task</Link>
            </header>
            
            <div className='tasks-list'>
                {taskElements}
            </div>
        </div>
    )
}

export default Dashboard