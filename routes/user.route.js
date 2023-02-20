
const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 3;
const userRoute = express.Router()
const { UserModel } = require("../model/user.model")

// \users/register ==> To register a new user.
// /users/login ==> For logging in generating a token


userRoute.post("/register", (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            // Store hash in your password DB.
            if (hash) {
                const user = new UserModel({ name, email, gender, age, city, password: hash })
                await user.save()
                res.send("user registered success")
            }
            else {
                res.send("err in hashing")
            }
        });
    } catch (err) { res.send({ "err": err.message }) }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'shhhhh');
                    res.send({ "msg": "login successful", "token": token })
                }
                else {
                    res.send("please login with correct details")
                }
            });
        }
    } catch (err) {
        console.log({ "err": err.message })
    }
})

module.exports = { userRoute }