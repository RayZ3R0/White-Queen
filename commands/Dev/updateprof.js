const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const profileSchema = require('../../schema/profile');

module.exports = {
    name: 'updateprof',
    description: 'Check your profile.',
    timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const sus = await profileSchema.find({ __v: 0 })

        const balanced = await require('discord-bot-eco').get(message.author.id, "wallet")
        sus.forEach(async baka => {
            await profileSchema.deleteOne({userid: baka.userid})
            const susd = new profileSchema({
                userid: baka.userid,
                selected: baka.selected,
                image: baka.image,
                color: baka.color,
                bio: baka.bio,
                level: baka.level,
                xp: baka.xp,
                energy: baka.energy,
                balance: baka.balance,
                items: [],
                started: true
            })
            susd.save()
            console.log(
                {
                    userid: baka.userid,
                    selected: baka.selected,
                    image: baka.image,
                    color: baka.color,
                    bio: baka.bio,
                    level: baka.level,
                    xp: baka.xp,
                    energy: baka.energy,
                    balance: balanced,
                    items: [],
                    started: true
                }
            )
        })

    },
};