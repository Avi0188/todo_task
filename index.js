const express=require("express")

const connection=require("./config/db")

const app=express()
const cors=require("cors")
const userRouter = require("./routes/user.route")
const todoRouter = require("./routes/todo.route")
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/todo",todoRouter)

app.listen(8000,async()=>{
    try {
        await connection
        console.log("server runnig at port 8000")
    } catch (error) {
        console.log(error)
    }
})