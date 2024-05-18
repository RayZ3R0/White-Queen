const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'worship',
 // aliases: [' '],
  description: 'No.',
  timeout: 3,
//  usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
  message.channel.send({
        content: 'https://media.discordapp.net/attachments/839082244060217404/1016222054359519252/Kuruworship.gif'
    })
  },
};