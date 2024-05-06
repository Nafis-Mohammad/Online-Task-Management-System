import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

import CategoryCard from '../components/CategoryCard'
import TaskCard from '../components/TaskCard'
import { requireAuth } from '../utils/requireAuth'
import { getUserInfo } from '../utils/getUserInfo'


export async function loader() {
    await requireAuth()
    const userTokenHeader = await getUserInfo()
    const allCategoriesPromise = axios.get('http://localhost:4000/api/category', userTokenHeader)
    const allTasksPromise = axios.get('http://localhost:4000/api/task', userTokenHeader)

    return Promise.all([allCategoriesPromise, allTasksPromise])
        .then((response) => {
            // console.log(response);
            return [response[0].data.categories, response[1].data.tasks]
        })
        .catch((error) => {
            console.log(error);
        })
}

const Category = () => {
    const [allCategories, allTasks] = useLoaderData()
    // console.log(allCategories, allTasks);

    const categoryElements = allCategories.map(category => {
        return [
        <div key={category._id} className='category-project-tasks-list'>
            <CategoryCard key={category._id} {...category} />
            <div className='tasks-list'>
                {
                allTasks.map(task => {
                    if(task.category === category._id) {
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
            {categoryElements}
        </div>
    )
}

export default Category