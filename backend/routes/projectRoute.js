const express = require("express")
const router = express.Router()

const { getAllProjects } = require("../controllers/projectCtrl")

const authenticationMiddleware = require("../middleware/auth")


// router.post("/", authenticationMiddleware, createTask)
// router.get("/:id", authenticationMiddleware, getTask)
router.get("/", authenticationMiddleware, getAllProjects)
// router.put("/:id", authenticationMiddleware, updateTask)
// router.delete("/:id", authenticationMiddleware, deleteTask)


module.exports = router