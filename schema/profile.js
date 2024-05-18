const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    userid: String,
    selected: String,
    image: String,
    color: String,
    bio: String,
    level: Number,
    xp: Number,
    energy: Number,
    balance: Number,
    items: Array,
    started: Boolean

})

module.exports = mongoose.model("profile", profile);