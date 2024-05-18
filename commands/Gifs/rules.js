const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'rules',
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
        content: 'https://cdn.discordapp.com/attachments/1015214307400753163/1044297647449718784/1669050328326.jpg'
    })
  },
};