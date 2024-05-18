const mongoose = require('mongoose')

const balance = new mongoose.Schema({
    guild: String,
    user: String,
    balance: Number,
})

module.exports = mongoose.model("balance", balance);