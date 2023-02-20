const express = require("express")
const app = express()
const connection = require("./config/db")
const { postRoute } = require("./routes/post.route")
const { userRoute } = require("./routes/user.route")
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use("/users", userRoute)
app.use("/posts", postRoute)



app.get("/", (req, res) => {
    res.send("welcome to linkedIn HomePage")
})

app.listen(7300, async () => {
    try {
        await connection
        console.log("*************connected to DB*****************")
    } catch (err) {
        res.send({ "err": err.message })
    }
    console.log("server is running 7300")
})