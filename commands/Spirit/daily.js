const { Message, Client } = require("discord.js");
const economy = require('discord-bot-eco');

const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: "daily",
    description: `Claim your daily rewards every 24 hours.`,
    timeout: 1 * 60 * 60 * 24,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let moneh = 100
        if (message.member.roles.cache.has('927097726934601729')) moneh = 200
        const datap = await profileSchema.findOne({
            userid: message.author.id
        })
        if (datap) {
            await profileSchema.findOneAndUpdate(
                {
                    userid: message.author.id
                },
                {
                    balance: datap.balance + moneh
                }
            )
        } else {
            const susd = new profileSchema({
                userid: message.author.id,
                selected: `None`,
                image: 'https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif',
                color: `#ff0000`,
                bio: `None`,
                level: 0,
                xp: 0,
                energy: 60,
                balance: moneh,
                items: [],
                started: false
            })
            susd.save()
        }
        await economy.give(message.author.id, moneh, "wallet")
        message.channel.send({ content: `You have received \`${moneh}\` Spirit Coins as a daily reward. Come back again after 24 hours to receive more.` })
    },
};
