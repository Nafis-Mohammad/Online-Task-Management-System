const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdTask: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
})


UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.createJWT = function () {
    const token = jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})

    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        // sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    return token
}


UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)