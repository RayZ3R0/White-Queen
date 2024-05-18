const client = require('../index')
const { CommandInteraction, MessageEmbed, Formatters } = require("discord.js");
const sp = require('../spirits.json')
const spiritSchema = require('../schema/spirits')
const profileSchema = require('../schema/profile')
client.on('ready', () => {
    setInterval(async () => {
        const sus = await profileSchema.find()
        sus.forEach(async pep => {
            const profileSearch = await profileSchema.findOne({ userid: pep.userid })
            if (profileSearch.selected === `None`) return;
            const energy = profileSearch.energy
            if (energy >= 60) return;
            const energyUpdate = await profileSchema.findOneAndUpdate({ userid: pep.userid }, { energy: energy + 1 })
        })
    }, 12 * 60 * 1000)

});