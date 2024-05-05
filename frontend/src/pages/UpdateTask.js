import React from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import BackButton from '../components/BackButton'
import { requireAuth } from '../utils/requireAuth';
import { getUserInfo } from '../utils/getUserInfo';


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

export async function handleUpdateTask({ request, params }) {
    // console.log("reached action function");
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
      .put(`http://localhost:4000/api/task/${params.id}`, taskData, userTokenHeader)
      .then(() => {
        console.log("Successfully updated task");
        return redirect("..")
      })
      .catch((error) => {
        // setErrorMsg(error.response.data)
        console.log(error);
        return redirect("..")
      })
    return msg
    // return null
}

const UpdateTask = () => {
    const data = useLoaderData()
    return (
        <div>
            <BackButton />
            UpdateTask
            <Form method="post">
                <input name='title' type='text' placeholder='Title' defaultValue={data.task.title} required />

                <input name='description' type='text' placeholder='Description' defaultValue={data.task.description} required />

                <input name='dueDate' type='date' placeholder='Due Date' defaultValue={data.task.dueDate.substring(0,10)} required />

                <input name='priorityLvl' type='number' placeholder='Priority Level' defaultValue={data.task.priorityLvl} required />

                <select name='progress' defaultValue={data.task.progress}>
                    <option value='To-Do'>To-Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                </select>

                <input name='category' type='text' placeholder='Category' defaultValue={data.category && data.category.title} />

                <input name='project' type='text' placeholder='Project' defaultValue={data.project && data.project.title} />

                <button type="submit">Update Task</button>
            </Form>
        </div>
    )
}

export default UpdateTask