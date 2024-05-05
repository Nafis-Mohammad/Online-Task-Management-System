const Category = require("../models/categoryModel")
// const Category = require("../models/categoryModel")


const getAllCategories = async (req, res) => {
    try {
        // const categories = await Category.find({createdBy:req.user.userId}).sort("priorityLvl")
        const categories = await Category.find()
        return res.status(200).json({categories})
    } catch(error) {
        return res.status(500).json({msg: "Failed to get all categories", error})
    }
}



module.exports = {
    getAllCategories
}