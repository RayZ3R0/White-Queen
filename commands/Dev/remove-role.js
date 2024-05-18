const { Client, Message } = require('discord.js');
let xp = require('simply-xp')

module.exports = {
  name: 'remove-role',
  description: 'Remove level role from Database.',
  timeout: 3,
  //usage: '',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_SERVER')) return message.reply({content: 'You do not have the permission to do this. You need `Manage Server` permissions in order to do so.'})
    xp.roleSetup
    .remove(client, message.guild.id, {
      level: args[0]
    })
    .then((l) => {
      // Replying to the message saying Done
      if (l) {
        message.reply({ content: 'Removed from Database' })
      }
    })
    .catch((e) => {
      // Catch if there is any error
      message.reply({ content: `Error: ${e}` })
    })


  },
};