const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'emit-join',
  //aliases: [' '],
  //description: ' ',
  //timeout: 3000,
 // usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    const owners = [
        '636598760616624128'
    ]
    if (!owners.includes(message.author.id)) return;
    client.emit('guildMemberAdd', message.member);
  },
};