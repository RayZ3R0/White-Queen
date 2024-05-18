const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: 'select',
    description: 'Select a Spirit for battle and dating.',
    usage: `<spiritID>`,
    timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        
        const balanced = await require('discord-bot-eco').get(message.author.id, "wallet")
        const data = await profileSchema.findOne({
            userid: message.author.id
        })
        const susa = await spiritSchema.findOne({ id: args[0] })
        if (!susa) return message.reply({ content: `Invalid ID. Provide valid ID or die.  Use \`harem\` command to check your spirits to find their ID.` })
        if (susa.husband != message.author.id) return message.reply({ content: `You cannot select a spirit who is married to another person. Don't be a thief bitch.` })
        if (data) {
            const sus = await profileSchema.findOneAndUpdate({ userid: message.author.id }, {
                selected: args[0]
            })
            data.save()
        } else {
            const susd = new profileSchema({
                userid: message.author.id,
                selected: args[0],
                image: "https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif",
                color: `#ff0000`,
                bio: `None`,
                level: 0,
                xp: 0,
                energy: 60,
                balance: balanced,
                items: [],
                started: false
            })
            susd.save()
        }
        message.channel.send({ content: `Successfully selected **${susa.name}**【${'<a:starSpin:1006138461234937887>'.repeat(susa.stars)}】` })

    },
};