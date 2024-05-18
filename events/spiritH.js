const client = require('../index')
const Discord = require('discord.js')
const spiritSchema = require('../schema/spirits')
const profileSchema = require('../schema/profile')

client.on("messageCreate", async (message) => {
    const profileSearch = await profileSchema.findOne({ userid: message.author.id })
    if (!profileSearch) return;
    const spiritSearch = await spiritSchema.findOne({ id: profileSearch.selected })
    if(!spiritSearch) return;
    if(message.content.startsWith(';')) return;
    
    const currenthappiness = spiritSearch.happiness + - 0.25
    const sus = await spiritSchema.findOneAndUpdate({ id: profileSearch.selected }, {
        happiness: currenthappiness >= 0 ? currenthappiness : 0
    })



});