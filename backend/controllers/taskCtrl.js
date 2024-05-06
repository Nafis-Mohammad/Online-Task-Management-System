const Task = require("../models/taskModel")
const Project = require("../models/projectModel")
const Category = require("../models/categoryModel")
const User = require("../models/userModel")


const findCategory = async (categoryTitle, userId) => {
    let checkCategory
    if(categoryTitle) {
        checkCategory = await Category.findOne({title: categoryTitle, createdBy: userId})
        if(!checkCategory) {
            checkCategory = await Category.create({title: categoryTitle, createdBy: userId})
        }
    }
    if(checkCategory) {
        return checkCategory._id
    }
}


const findProject = async (projectTitle, userId) => {
    let checkProject
    if(projectTitle) {
        checkProject = await Project.findOne({title: projectTitle, createdBy: userId})
        if(!checkProject) {
            checkProject = await Project.create({title: projectTitle, createdBy: userId})
        }
    }
    if(checkProject) {
        return checkProject._id
    }
}


const deleteTaskFromUserCategoryProject = async (taskId, userId, categoryId, projectId) => {   
    const user = await User.findByIdAndUpdate(userId, {$pull: {createdTask: taskId}}, {new:true, runValidators:true})

    if(categoryId) {
        const category = await Category.findByIdAndUpdate(categoryId, {$pull: {task: taskId}}, {new:true, runValidators:true})
    }

    if(projectId) {
        const project = await Project.findByIdAndUpdate(projectId, {$pull: {task: taskId}}, {new:true, runValidators:true})
    }
}


const createTaskForUserCategoryProject = async (taskId, userId, categoryId, projectId) => {
    const user = await User.findByIdAndUpdate(userId, {$push: {createdTask: taskId}}, {new:true, runValidators:true})

    if(categoryId) {
        const category = await Category.findByIdAndUpdate(categoryId, {$push: {task: taskId}}, {new:true, runValidators:true})
    }

    if(projectId) {
        const project = await Project.findByIdAndUpdate(projectId, {$push: {task: taskId}}, {new:true, runValidators:true})
    }
}




const createTask = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const categoryId = await findCategory(req.body.category, req.user.userId)
        const projectId = await findProject(req.body.project, req.user.userId)
        const task = await Task.create({...req.body, category: categoryId, project: projectId})

        await createTaskForUserCategoryProject(task._id, req.user.userId, categoryId, projectId)

        return res.status(201).json({msg:"Successfully created task", task})
    } catch(error) {
        return res.status(500).json({msg: "Failed to create task", error})
    }
}


const updateTask = async(req, res) => {
    let {body: {title, description, dueDate, priorityLvl, progress, category, project}, user:{userId}, params:{id:taskId}} = req

    req.body.category = await findCategory(category)
    req.body.project = await findProject(project)

    const task = await Task.findByIdAndUpdate({_id:taskId, createdBy:userId}, req.body, {new:true, runValidators:true})

    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }

    await deleteTaskFromUserCategoryProject(task._id, userId, req.body.category, req.body.project)

    return res.status(200).json({task})
}


const getTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findOne({_id:taskId, createdBy:userId})
    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }

    let project
    let category
    if(task.category) {
        category = await Category.findOne({_id: task.category, createdBy: userId})
    }
    if(task.project) {
        project = await Project.findOne({_id: task.project, createdBy: userId})
    }

    return res.status(200).json({ task, category: category, project: project })
    
}


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({createdBy:req.user.userId}).sort("priorityLvl")
        return res.status(200).json({tasks})
    } catch(error) {
        return res.status(500).json({msg: "Failed to get all tasks", error})
    }
}


const deleteTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findByIdAndDelete({_id:taskId, createdBy:userId})

    if(!task) {
        return res.status().json(`No task with id ${taskId}`)
    }

    await deleteTaskFromUserCategoryProject(taskId, userId, task.category, task.project)

    return res.status(200).json("task successfully deleted")
}


module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
}