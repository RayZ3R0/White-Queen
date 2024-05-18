const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'welcome',
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
        content: 'https://cdn.discordapp.com/attachments/965509744859185262/1031638285883281459/1666032075971.jpg'
    })
  },
};