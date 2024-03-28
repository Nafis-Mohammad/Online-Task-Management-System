require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const connectDB = require("./db/connect")

// To parse json
app.use(express.json())

const userRouter = require("./routes/userRoute")

app.use("/api/user", userRouter)




const port = 3000

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