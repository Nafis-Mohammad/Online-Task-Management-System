const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },

    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task"}]

    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
    
}, {timestamps: true})

module.exports = mongoose.model("Category", CategorySchema)