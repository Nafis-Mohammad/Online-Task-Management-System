const Task = require("../models/taskModel")
const Project = require("../models/projectModel")
const Category = require("../models/categoryModel")


const findCategory = async (category) => {
    let checkCategory
    if(category) {
        checkCategory = await Category.findOne({title: category})
        if(!checkCategory) {
            checkCategory = await Category.create({title: category})
        }
    }
    if(checkCategory) {
        return checkCategory._id
    }
}

const findProject = async (projectTitle) => {
    let checkProject
    if(projectTitle) {
        checkProject = await Project.findOne({title: projectTitle})
        if(!checkProject) {
            checkProject = await Project.create({title: projectTitle})
        }
    }
    if(checkProject) {
        return checkProject._id
    }
    
}


const createTask = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const category = await findCategory(req.body.category)
        const project = await findProject(req.body.project)
        const task = await Task.create({...req.body, category: category, project: project})
        return res.status(201).json({msg:"Successfully created task", task})
    } catch(error) {
        return res.status(500).json({msg: "Failed to create task", error})
    }
}

const updateTask = async(req, res) => {

    let {body: {title, description, dueDate, priorityLvl, progress, category, project}, user:{userId}, params:{id:taskId}} = req

    // let {body: {title, description, dueDate, priorityLvl, progress, category, project}, params:{id: taskId}} = req

    req.body.category = await findCategory(category)
    req.body.project = await findProject(project)

    const task = await Task.findByIdAndUpdate({_id:taskId, createdBy:userId}, req.body, {new:true, runValidators:true})

    // const task = await Task.findByIdAndUpdate({_id: taskId}, req.body, {new: true, runValidators: true})

    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }
    return res.status(200).json({task})
}

const getTask = async (req, res) => {
    // const {params:{id: taskId}} = req
    // const task = await Task.findOne({_id: taskId})
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findOne({_id:taskId, createdBy:userId})
    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }

    let project
    let category
    if(task.category) {
        category = await Category.findOne({_id: task.category})
    }
    if(task.project) {
        project = await Project.findOne({_id: task.project})
    }

    return res.status(200).json({ task, category: category, project: project })
    
}


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({createdBy:req.user.userId}).sort("priorityLvl")
        // const tasks = await Task.find().sort("priorityLvl")
        return res.status(200).json({tasks})
    } catch(error) {
        return res.status(500).json({msg: "Failed to get all tasks", error})
    }
}




const deleteTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findByIdAndDelete({_id:taskId, createdBy:userId})

    // const {params:{id: taskId}} = req
    // const task = await Task.findByIdAndDelete({_id:taskId})

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