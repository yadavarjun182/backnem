const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    gender: String,
    password: String,
    age: Number,
    city: String
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }