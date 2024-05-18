const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: 'energyrefill',
    description: 'Refill your energy.',
    timeout: 1 * 60 * 60 * 12,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
/*        const profileSearch = await profileSchema.findOne({ userid: message.author.id })
        if (profileSearch.selected === `None` || !profileSearch) return message.channel.send({ content: `You do not have a spirit selected. Use the select command to select a spirit first.` })
        const energy = profileSearch.energy
        if (energy >= 60) return message.reply({content: `Your energy is already full.`})
        const energyUpdate = await profileSchema.findOneAndUpdate({ userid: message.author.id }, { energy: energy + 60 })*/
        message.reply({content: `This command has been disabled. Energy is now refilled by 1 automatically every 12 minutes. In case your energy is not refilled automatically, please contact **ぜろ#6969**.`})
    },
};