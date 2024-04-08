require("dotenv").config()
require("express-async-errors")


// // security packages
// const helmet = require("helmet")
const cors = require("cors")
// const xss = require("xss-clean")
// const rateLimiter = require("express-rate-limit")

// app.use(rateLimiter())
// app.use(helmet())

// app.use(xss())


const express = require("express")
const app = express()

const connectDB = require("./db/connect")
const authenticateUser = require("./middleware/auth")

// To parse json
app.use(express.json())

app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type']
// }))

const userRouter = require("./routes/userRoute")
const taskRouter = require("./routes/taskRoute")

app.use("/api/user", userRouter)
app.use("/api/task", authenticateUser, taskRouter)




const port = process.env.PORT || 4000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error);
    }
}

start()