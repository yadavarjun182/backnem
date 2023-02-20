// /posts ==> This will show the posts of logged in users.
// /posts/top ==> This will show the post details that has maximum number of comments for the user who has logged in.
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.


const express = require("express")
const { PostModel } = require("../model/post.model")
const postRoute = express.Router();
const {authenticate } = require("../middleware/authenticate.middleware")
postRoute.get("/", async (req, res) => {
    try {
        const posts = await PostModel.find({})
        console.log(posts)
        res.send(posts)
    } catch (err) {
        res.send({ "err": err.message })
    }

})

postRoute.post("/create", authenticate, async (req, res) => {
    try {
        const payload = req.body
        const post = new PostModel(payload)
        await post.save()
        res.send("created post successfully")
    } catch (err) {
        res.send({ "err": err.message })
    }

})

postRoute.get("/top", (req, res) => {
    res.send("post having max comments")
})


postRoute.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const post = await PostModel.findOne({ "_id": id })
    const post_id = post.userID
    const req_id = req.body.userID
    try {
        if (req_id !== post_id)
            res.send("not authorised")
        else {
            await PostModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("post updated")
        }
    } catch (err) {
        res.send({ "err": err.message })
    }
})



postRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const post = await PostModel.findOne({ "_id": id })
    const post_id = post.userID
    const req_id = req.body.userID
    try {
        if (req_id !== post_id)
            res.send("not authorised")
        else {
            await PostModel.findByIdAndDelete({ "_id": id })
            res.send("post deleted")
        }
    } catch (err) {
        res.send({ "err": err.message })
    }
})

module.exports = { postRoute }