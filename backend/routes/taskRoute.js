const express = require("express")
const router = express.Router()

const {createTask, getTask, getAllTasks, updateTask, deleteTask} = require("../controllers/taskCtrl")


router.post("/", createTask)
router.get("/:id", getTask)
router.get("/", getAllTasks)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)


module.exports = router