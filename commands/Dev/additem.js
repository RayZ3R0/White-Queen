const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'additem',
  //aliases: [' '],
  description: 'a',
  timeout: 3,
  //usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `You dont have Permission to use this Command`
      );
    var user = message.mentions.users.first() || message.author;

    let data = await client.eco.AddItem(message.guild.id, args[0], args[1], args[2])

    message.channel.send({embeds: [new MessageEmbed()
      .setTitle(`${args[0]} Has Been Added To The Shop`)
      .setDescription(`Users can now buy ${args[0]} for ${args[1]} from the shop`)
      .setFooter(' 👍 ')
      .setTimestamp()
    ] })
  },
};

