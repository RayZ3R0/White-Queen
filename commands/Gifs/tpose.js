const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'tpose',
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
        content: 'https://cdn.discordapp.com/attachments/901338354166140928/1025496710841122898/kurumi_T_pose.png'
    })
  },
};