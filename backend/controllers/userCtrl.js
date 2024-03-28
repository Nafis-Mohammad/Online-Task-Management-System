const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({newUser})
    } catch(error) {
        return res.status(500).json({msg: "Failed to create user", error})
    }
}


const loginUser = async (req, res) => {
    const {userName, password} = req.body
    const {id} = await User.findOne({userName: userName}).exec()
    const token = jwt.sign({id, userName}, process.env.JWT_SECRET, {expiresIn:'30d'})
    
}

module.exports = {
    createUser,
    loginUser
}