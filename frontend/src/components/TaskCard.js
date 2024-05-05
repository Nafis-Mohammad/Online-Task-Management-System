import React from 'react'
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'

const TaskCard = (props) => {
    return (
        <div className='task-card'>

            <div className='task-card-info'>
                <h3>Title: {props.title}</h3>
                {/* <p>Description: {props.description}</p> */}
                <p>Priority Level: {props.priorityLvl}</p>
                <p>Due Date: {props.dueDate.substring(0,10)}</p>
                <p>Progress: {props.progress}</p>
                {/* <p>Category: {props.category}</p> */}
                {/* <p>Project: {props.project}</p> */}
            </div>

            <div className='task-card-interact'>
                <Link to={`/userHome/viewTask/${props._id}`}><BsInfoCircle className='task-card-icon task-card-about' /></Link>

                <Link to={`/userHome/updateTask/${props._id}`}><AiOutlineEdit className='task-card-icon task-card-edit' /></Link>

                <Link to={`/userHome/deleteTask/${props._id}`}><MdOutlineDelete className='task-card-icon task-card-delete' /></Link>
            </div>

        </div>
    )
}

export default TaskCard