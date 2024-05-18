const mongoose = require('mongoose')

const spirits = new mongoose.Schema({
    name: String,
    husband: String,
    stars: Number,
    happiness: Number,
    id: String,
    skin: String,
    attackboost: Number,
    defenceboost: Number,
    agilityboost: Number,
    spiritPowerBoost: Number,
    items: Array,
    nickname: String
})

module.exports = mongoose.model("spirits", spirits);