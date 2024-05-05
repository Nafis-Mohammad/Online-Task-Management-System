const express = require("express")
const router = express.Router()
const authenticationMiddleware = require("../middleware/auth")

const { createUser, loginUser, logoutUser } = require("../controllers/userCtrl")


router.post("/signup", createUser)
router.post("/login", loginUser)
// router.post("/logout", authenticationMiddleware, logoutUser)
router.get("/logout", logoutUser)

module.exports = router