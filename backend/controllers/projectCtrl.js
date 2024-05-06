const Project = require("../models/projectModel")


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({createdBy:req.user.userId})
        // const projects = await Project.find()
        return res.status(200).json({projects})
    } catch(error) {
        return res.status(500).json({msg: "Failed to get all projects", error})
    }
}



module.exports = {
    getAllProjects
}