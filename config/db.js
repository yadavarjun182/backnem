const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://arjun:arjun@cluster0.3wtn3cm.mongodb.net/linkedin?retryWrites=true&w=majority")

module.exports = { connection }