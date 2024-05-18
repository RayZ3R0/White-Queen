const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'pins',
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
        content: 'https://cdn.discordapp.com/attachments/1009408632317804544/1239903000148054086/pins.png?ex=66449d27&is=66434ba7&hm=4d1d0a74c6d660e9f17ba3cd910d099427c8f16ea1fdfb4e34b80b0c6aff1bfe&'
    })
  },
};