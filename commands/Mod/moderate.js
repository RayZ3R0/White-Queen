const { Message, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js')
const Client = require('../../index')

module.exports = {
  name: 'moderate',
  description: 'Moderate a specific user.',
  timeout: 3,
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(' ') || `None provided.`
    let noPermmisons = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(` | You Don't Have \`Ban Members\` permissions`)

    const appeal = new MessageEmbed()
      .setColor('#ff000')
      .setDescription(`
        You have been banned from **Kurumi's Empire**. **Reason:** ${reason}
        If you want to appeal, click the button below, and explain your reasons and why we should unban you.
        `)
    const kickbed = new MessageEmbed()
      .setColor('#ff000')
      .setDescription(`
        You have been kicked from **Kurumi's Empire**. **Reason:** ${reason}
        `)
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply({ embeds: [noPermmisons] })
    }
    if (member.permissions.has("BAN_MEMBERS")) return message.reply('You cannot moderate this user because they are a Council Member.')
    // if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply('I cannot moderate this user because they are higher than me.')
    if (member.id === message.member.id) return message.reply('You cannot moderate yourself.')
    if (member.id === message.guild.me.id) return message.reply('I cannot moderate myself.')

    const kButton = new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER')
    const banButton = new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER')
    const appealbutton = new MessageButton().setCustomId('appeal').setLabel('Appeal').setStyle('SUCCESS')

    let row = new MessageActionRow().addComponents(kButton, banButton)
    let rowa = new MessageActionRow().addComponents(appealbutton)
    const collector = message.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 3000 })
    message.reply({ content: 'Select an action to perform.', components: [row], ephemeral: true })

    collector.on('collect', async (m) => {
      try {
        if (m.customId === 'kick') {
          await member.send({ embeds: [kickbed] })
          member.kick({ reason: reason || 'No Reason Specified.' })
          kButton.setDisabled(true)
          banButton.setDisabled(true)
          row = new MessageActionRow().addComponents(kButton, banButton)
          m.update({ content: `${member.user.tag} has been kicked. **Reason:** ${reason}`, components: [row] })
        }
        if (m.customId === 'ban') {
          await member.send({ embeds: [appeal], components: [rowa] })
          member.ban({ reason: reason || 'No reason specified.' })
          kButton.setDisabled(true)
          banButton.setDisabled(true)
          row = new MessageActionRow().addComponents(kButton, banButton)
          m.update({ content: `${member.user.tag} has been banned. **Reason:** ${reason}`, components: [row] })
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
}