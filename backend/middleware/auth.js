const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Authentication invalid"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // const user = User.findById(decoded.id).select("-password")
        // req.user = user

        const {id, userName} = decoded
        req.user = {userId: id, userName: userName}   // req. user ????
        next()
    } catch (error) {
        return res.status(401).json({error: "Not authorized to access this route"})
    }
}

module.exports = authenticationMiddleware