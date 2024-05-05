import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';
import { requireAuth } from '../utils/requireAuth';
import { getUserInfo } from '../utils/getUserInfo';

export async function loader() {
    await requireAuth()
    const userTokenHeader = await getUserInfo()
    const allProjectsPromise = axios.get('http://localhost:4000/api/project', userTokenHeader)
    const allTasksPromise = axios.get('http://localhost:4000/api/task', userTokenHeader)

    return Promise.all([allProjectsPromise, allTasksPromise])
        .then((response) => {
            // console.log(response);
            return [response[0].data.projects, response[1].data.tasks]
        })
        .catch((error) => {
            console.log(error);
        })
}

const Project = () => {
    const [allProjects, allTasks] = useLoaderData()
    // console.log(allProjects, allTasks);

    const projectElements = allProjects.map(project => {
        return [
        <div key={project._id} className='category-project-tasks-list'>
            <ProjectCard key={project._id} {...project} />
            <div className='tasks-list'>
                {
                allTasks.map(task => {
                    if(task.project === project._id) {
                        return <TaskCard key={task._id} {...task} />
                    }
                    return null
                })
                }
            </div>
        </div>
        ]
    })
    
    return (
        <div>
            {projectElements}
        </div>
    )
}

export default Project