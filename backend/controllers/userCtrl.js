const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const {sendToken} = require("../utils/jwtToken")



const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = newUser.createJWT()
        return res.status(200).json({newUser, token})
        // sendToken(newUser, 201, res)
    } catch(error) {
        return res.status(500).json({msg: "Failed to create user", error})
    }
}


const loginUser = async (req, res) => {
    const {userName, password} = req.body
    if(!userName || !password) {
        return res.status(400).json("Missing username and-or password")
    }
    
    const user = await User.findOne({userName: userName})
    if (!user) {
        return res.status(401).json("Invalid credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(401).json("Invalid credentials")
    }
    const token = user.createJWT()
    // sendToken(user, 200, res)
    return res.status(200).json({user, token})
}


// this logout does nothing, logout is handled from the frontend
const logoutUser = (req, res) => {
    console.log(res.headers);
    // req.delete("authorization")
    // console.log(res.headers.authorization);  // clear authorization from res
    // res.delete("authorization")
    res.clearCookie('userInfo');
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
}