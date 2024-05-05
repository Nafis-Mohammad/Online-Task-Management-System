import React from 'react'
import { Link, Form, redirect } from 'react-router-dom'
import axios from 'axios'

import BackButton from '../components/BackButton'
import { getUserInfo } from '../utils/getUserInfo'


export async function handleCreateTask({ request }) {
    const userTokenHeader = await getUserInfo()
    const formData = await request.formData()
    const title = formData.get("title")
    const description = formData.get("description")
    const dueDate = formData.get("dueDate")
    const priorityLvl = formData.get("priorityLvl")
    const progress = formData.get("progress")
    const category = formData.get("category")
    const project = formData.get("project")
    const taskData = {
        title,
        description,
        dueDate,
        priorityLvl,
        progress,
        category,
        project
    }
    const msg = axios
      .post('http://localhost:4000/api/task', taskData, userTokenHeader)
      .then(() => {
        console.log("Successfully created task");
        return redirect("..")
      })
      .catch((error) => {
        console.log(error);
        return redirect("..")
      })
    return msg
    // return taskData
}


const CreateTask = () => {
    return (
        <div>
            <BackButton />
            createTask
            <Form method="post">
                <input name='title' type='text' placeholder='Title' required />

                <input name='description' type='text' placeholder='Description' required />

                <input name='dueDate' type='date' placeholder='Due Date' required />

                <input name='priorityLvl' type='number' placeholder='Priority Level' required />

                <select name='progress'>
                    <option value='To-Do'>To-Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                </select>

                <input name='category' type='text' placeholder='Category' />

                <input name='project' type='text' placeholder='Project' />

                <button type="submit">Create Task</button>
            </Form>
        </div>
    )
}

export default CreateTask