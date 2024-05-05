const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },

    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task"}],

    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],

    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
    
}, {timestamps: true})

module.exports = mongoose.model("Project", ProjectSchema)