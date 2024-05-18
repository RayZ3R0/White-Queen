const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'cri',
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
        content: 'https://cdn.discordapp.com/attachments/900307317491384320/981461266067492884/Kurumi_Cry.mp4?size=4096'
    })
  },
};