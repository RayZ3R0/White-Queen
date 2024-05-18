const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'stonks',
 // aliases: [' '],
  description: 'No.',
  timeout: 3,
  ownerOnly: false,
//  usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
  message.channel.send({
        content: 'https://cdn.discordapp.com/attachments/839082244060217404/1037236623387148298/1667365614808.jpg'
    })
  },
};