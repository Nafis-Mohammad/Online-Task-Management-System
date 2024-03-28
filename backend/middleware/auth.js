const jwt = require("jsonwebtoken")


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({error: "No token provided"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, userName} = decoded
        req.user = {id, userName}   // req. user ????
        next()
    } catch (error) {
        res.status(401).json({error: "Not authorized to access this route"})
    }
}

module.exports = authenticationMiddleware