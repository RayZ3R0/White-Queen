const { Message, Client } = require("discord.js");
const economy = require('discord-bot-eco');

const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: "start",
    description: `Start your journey! You gain 5000 Spirit Coins for starting.`,
    timeout: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const spirita = await spiritSchema.find({
            husband: message.author.id,
        })
        const datap = await profileSchema.findOne({
            userid: message.author.id
        })
        if(datap && datap.started == true) return message.reply({content: `You have already started the game. You cannot do it again.`})
        //await economy.give(message.author.id, 5000, "wallet")
        
        if (datap) {
            await profileSchema.findOneAndUpdate(
                {
                    userid: message.author.id
                },
                {
                    balance: datap.balance + 5000,
                    started: true
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
                balance: 5000,
                items: [],
                started: true
            })
            susd.save()
        }
        message.channel.send({content: `You have successfully started the game! You have received \`5000\` Spirit Coins as a reward. Use the \`;summon\` command to summon a spirit.`})
    },
};
