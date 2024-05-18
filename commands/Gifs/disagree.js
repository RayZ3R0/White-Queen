const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'disagree',
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
        content: 'https://tenor.com/view/the-council-of-kurumi-kurumi-kurumi-tokisaki-kurumi-s4-dal-gif-26043923'
    })
  },
};