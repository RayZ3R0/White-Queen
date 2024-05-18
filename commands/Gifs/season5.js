const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'season5',
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
        content: 'https://media.discordapp.net/attachments/965509744859185262/1239137654629597184/image0-transformed.png?ex=6641d45e&is=664082de&hm=c194d7b4101a2123d8e491341b6ad9a6f757bc18b680f10dd00cb36d6d7793f9&quality=lossless&'
    })
  },
};