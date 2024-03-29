const express = require("express")
const router = express.Router()

const { createUser, loginUser, logoutUser } = require("../controllers/userCtrl")


router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

module.exports = router