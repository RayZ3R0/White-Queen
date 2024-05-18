const { Client, Message, MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const WomboDream = require('dream-api');
const fetch = require('node-fetch')

module.exports = {
  name: 'dream',
  description: 'Create your own Art by an ai',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member

    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return

    if (
      !message.guild.me.permissions.has([
        'EMBED_LINKS',
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL',
      ])
    ) {
      return message.channel.send({ content: `
      ❌ I require some Permissions!

      **I need the following Permissions to work on your Server:**
      EMBED_LINKS,
      ADD_REACTIONS, 
      SEND_MESSAGES, 
      READ_MESSAGE_HISTORY,
      VIEW_CHANNEL

      ⚠️ Please add me the right Permissions and re-run this Command!
  
      `})
    }

    const GetStyle = await fetch('https://paint.api.wombo.ai/api/styles/').then(res => res.json())
    //for each 24 style get the id and name
    //get each style and name
    const style = GetStyle.map(style => {
      return {
        id: style.id,
        name: style.name,
      }
    })

    if(!args[0]) return message.channel.send('Please specify a style!' + "\n" + style.map(style => `\`${style.id}\` = \`${style.name}\``).join('\n'))
    if(isNaN(args[0])) return message.channel.send("The number is not valid!")

    if(!args[1]) return message.channel.send("Please specify something for the ai to create")

    message.channel.send("> **This action can take some minutes many people are doing request please wait**")

    let image = await WomboDream.generateImage(args[0], args[1]);

    let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${member.user.username}'s Art`)
      .setImage(image.result.final)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp()

      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
        .setLabel('Download')
        //get the image sended on the embed
        .setURL(image.result.final)
        .setStyle('LINK'),
  
  
        //Leave this in case user uses the image for some sort of thing and you can't get sued
        new Discord.MessageButton()
        .setLabel('AI TOS')
        .setURL("https://www.w.ai/terms-of-service-wombo-dream")
        .setStyle('LINK')
      )
    message.channel.send({ embeds: [embed], components: [row] })
  },
}
