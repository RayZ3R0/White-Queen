const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: 'energy',
    description: `Check how much energy you have.`,
    timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const data = await profileSchema.findOne({
            userid: message.author.id
        })
        message.reply({content: `You have __${data.energy}/60__ Energy.`})
    },
};