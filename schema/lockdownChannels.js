const mongoose = require('mongoose');

module.exports = mongoose.model("lockdown-channels", new mongoose.Schema({
    guildID: String,
    channels: Object,
}));