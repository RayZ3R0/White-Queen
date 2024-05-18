const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');


module.exports = {
  name: 'ban',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

    const reason = args.slice(1).join(' ');
    const haxedUser = message.guild.members.cache.get(args[0])


    if (haxedUser) return message.reply({ content: `That user is already in the server. Use the moderate command to ban.` })

    message.guild.members.ban(args[0], { reason: `${reason || `No reason`}` }).then((mem) => {
      message.reply({
        embeds: [new MessageEmbed()
          .setDescription(`**${mem.tag}** Was Banned By ${message.author.tag} `)
          .setColor('RED')]
      })
    }).catch((err) => message.reply({ content: `Error. ${err}` }))


  }
} 