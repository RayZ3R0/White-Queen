const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const profileSchema = require('../../schema/profile');
const spiritSchema = require('../../schema/spirits')
module.exports = {
    name: 'profile',
    description: `Check your or someone's profile or edit your profile.`,
    usage: `[@user] | ;profile set image <image link> | ;profile set bio <bio> | ;profile set color <hex code>`,
    timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        
        const balanced = await require('discord-bot-eco').get(message.author.id, "wallet")
        if (args[0] === `set` && args[1] === `image`) {
            if(!args[2]) return message.reply({content: `Provide a valid color to set!`})
            const data = await profileSchema.findOne({
                userid: message.author.id
            })
            if (data) {
                const sus = await profileSchema.findOneAndUpdate({ userid: message.author.id }, {
                    image: args[2],
                })
                data.save()
            } else {
                const susd = new profileSchema({
                    userid: message.author.id,
                    selected: `None`,
                    image: args[2],
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
            message.reply({ content: `Set ${args[2]} as your profile image.` })

        } else if (args[0] === `set` && args[1] === `bio`) {
            
            if(!args[2]) return message.reply({content: `Provide a valid bio to set!`})
            const data = await profileSchema.findOne({
                userid: message.author.id
            })
            if (data) {
                const sus = await profileSchema.findOneAndUpdate({ userid: message.author.id }, {
                    bio: args.slice(2).join(' '),
                })
                data.save()
            } else {
                const susd = new profileSchema({
                    userid: message.author.id,
                    selected: `None`,
                    image: 'https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif',
                    color: `#ff0000`,
                    bio: `${args.slice(2).join(' ')}`,
                    level: 0,
                    xp: 0,
                    energy: 60,
                    balance: balanced,
                    items: [],
                    started: false
                })
                susd.save()
            }
            message.reply({ content: `Set \`${args.slice(2).join(' ')}\` as your profile bio.` })

        } else if (args[0] === `set` && args[1] === `color`) {
            if(!args[2]) return message.reply({content: `Provide a valid color to set!`})
            const data = await profileSchema.findOne({
                userid: message.author.id
            })
            if (data) {
                const sus = await profileSchema.findOneAndUpdate({ userid: message.author.id }, {
                    color: args[2]
                })
                data.save()
            } else {

               
                const susd = new profileSchema({
                    userid: message.author.id,
                    selected: `None`,
                    image: 'https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif',
                    color: args[2],
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
            message.reply({ content: `Set \`${args[2]}\` as your profile color.` })

        } else {
            const mUser =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.member;
            let data;

            const datab = await profileSchema.findOne({ userid: mUser.user.id })
            const obj = {
                userid: mUser.user.id,
                selected: `None`,
                image: 'https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif',
                color: `#ff0000`,
                bio: `None`,
                level: 0,
                xp: 0,
                energy: 60,
                balance: balanced,
                items: [],
                started: false
            }
            if (!datab) {
                data = obj
                const susd = new profileSchema(obj)
                susd.save()
            } else data = datab

            const spiritSearch = await spiritSchema.findOne({ id: data.selected })
            const allspiritSearch = await spiritSchema.find({ husband: mUser.user.id })
            const selectedSpirit = spiritSearch ? `${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】` : `None`
            const susEmbed = new MessageEmbed()
                .setColor(data.color)
                .setAuthor({ name: mUser.user.username, iconURL: mUser.user.displayAvatarURL({ dynamic: true }) })
                /*.setDescription(`
                **Selected Spirit:** ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】
                **Total Spirits:** ${allspiritSearch.length}
                **Bio:** ${data.bio}
                `)*/
                .addFields(
                    {
                        name: `Selected Spirit`,
                        value: selectedSpirit,
                        inline: false
                    },
                    {
                        name: `Total Spirits`,
                        value: `${allspiritSearch.length}`,
                        inline: false
                    },
                    {
                        name: `Bio`,
                        value: `${data.bio}`,
                        inline: false
                    }
                )
                .setImage(data.image)
            message.reply({ embeds: [susEmbed] })
        }
    },
};