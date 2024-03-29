const Task = require("../models/taskModel")


const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    return res.status(201).json({msg:"Successfully created task", task})
}


const getTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findOne({_id:taskId, createdBy:userId})
    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }
    return res.status(200).json({task})
}


const getAllTasks = async (req, res) => {
    const tasks = await Task.find({createdBy:req.user.userId}).sort("priorityLvl")
    return res.status(200).json({tasks})
}


const updateTask = async(req, res) => {
    const {body: {title, description, dueDate, priorityLvl, progress}, user:{userId}, params:{id:taskId}} = req


    const task = await Task.findByIdAndUpdate({_id:taskId, createdBy:userId}, req.body, {new:true, runValidators:true})

    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }
    return res.status(200).json({task})
}


const deleteTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req

    const task = await Task.findByIdAndDelete({_id:taskId, createdBy:userId})

    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }
    return res.status(200).json("task successfully deleted")
}


module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
}