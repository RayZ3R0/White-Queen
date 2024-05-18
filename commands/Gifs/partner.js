const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'partner',
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
        content: 'https://media.discordapp.net/attachments/839082244060217404/1026059820631064596/1664518192966.jpg?width=350&height=473'
    })
  },
};