const { Client, Message } = require('discord.js');
let xp = require('simply-xp')

module.exports = {
  name: 'add-role',
  description: 'Add level role',
  timeout: 3,
  //usage: '',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_SERVER')) return message.reply({content: 'You do not have the permission to do this. You need `Manage Server` permissions in order to do so.'})
    let rol =
            message.guild.roles.cache.find((r) => r.name == args[1]) ||
            message.guild.roles.cache.find((r) => r.id == args[1]) ||
            message.mentions.roles.first();
    xp.roleSetup
    .add(client, message.guild.id, {
      level: args[0],
      role: rol.id
    })
    .then((l) => {
      // Replying to the message saying Done
      if (l) {
        message.reply({ content: 'Added to Database' })
      }
    })
    .catch((e) => {
      // Catch if there is any error
      message.reply({ content: `Error: ${e}` })
    })


  },
};