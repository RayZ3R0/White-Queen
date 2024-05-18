const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
module.exports = {
    name: 'harem',
    aliases: ['ms', 'myspirits'],
    description: `Check your or someone else's spirits.`,
    usage: `[@user]`,
    timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.member;
        const spirite = await spiritSchema.find({
            husband: message.author.id,
        })
        const spirita = spirite.sort((a, b) => b.stars - a.stars)
        if (!spirita) return message.reply({ content: `You do not have any spirits. Use the summon command to summon one.` })
        const spirits = []
        spirita.map(c => spirits.push(`**${c.name} 【${'<a:starSpin:1006138461234937887>'.repeat(c.stars)}】** | **ID:** \`${c.id}\``))
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`\n${spirits.join('\n')}\n`)
            .setTitle(`${user.user.username}'s Spirits`)
            .setFooter({ text: user.user.tag, iconURL: user.user.displayAvatarURL({ dynamic: true }) })
            .setImage('https://c.tenor.com/-yGUfX6KZWUAAAAC/date-a-live-game-danmachi-collaboration.gif')
        setTimeout(async () => {
            message.reply({ embeds: [embed] })
        }, 2000)

    },
};