const { Message, Client } = require("discord.js");
const economy = require('discord-bot-eco');
const profileSchema = require('../../schema/profile');
module.exports = {
    name: "add",
    ownerOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({content: `You don't have perms to do this, die.`});
        
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        
        
        const mone = parseInt(args[1])
        await economy.give(user.id, mone, "wallet")
        const datap = await profileSchema.findOne({
            userid: user.id
        })
        if (datap) {
            await profileSchema.findOneAndUpdate(
                {
                    userid: user.id
                },
                {
                    balance: datap.balance + mone
                }
            )
        } else {
            const susd = new profileSchema({
                userid: user.id,
                selected: `None`,
                image: 'https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif',
                color: `#ff0000`,
                bio: `None`,
                level: 0,
                xp: 0,
                energy: 60,
                balance: mone,
                items: [],
                started: false
            })
            susd.save()
        }
        message.channel.send({content: `Added **${mone}** Spirit Coins to **${user.tag}**`})
    },
};
