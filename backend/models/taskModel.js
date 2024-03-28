const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    dueDate: {
        type: Date,
        required: true,
    },

    priorityLvl: {
        type: Number,
        required: true,
    },

    progress: {  //"To-Do," "In Progress, “or "Completed."
        type: String,
        default: "To-Do",
        enum: {
            values: ['To-Do', 'In Progress', 'Completed'],
            message: '{VALUE} is not a valid status for progress'
          }
    },
})

module.exports = mongoose.model("Task", TaskSchema)