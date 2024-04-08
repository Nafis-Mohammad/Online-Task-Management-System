const express = require("express")
const router = express.Router()

const {createTask, getTask, getAllTasks, updateTask, deleteTask} = require("../controllers/taskCtrl")

const authenticationMiddleware = require("../middleware/auth")


router.post("/", authenticationMiddleware, createTask)
router.get("/:id", authenticationMiddleware, getTask)
router.get("/", authenticationMiddleware, getAllTasks)
router.put("/:id", authenticationMiddleware, updateTask)
router.delete("/:id", authenticationMiddleware, deleteTask)


module.exports = router