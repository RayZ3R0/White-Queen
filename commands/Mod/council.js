const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../schema/warndb')

module.exports = {
    name: 'council',
    timeout: 3,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send({content: `https://media.discordapp.net/attachments/938770418599337984/966556469711499365/unknown.png`})
    },
};