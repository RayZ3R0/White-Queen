const { Message, Client, MessageEmbed } = require("discord.js");
const profileSchema = require('../../schema/profile');
module.exports = {
    name: "inventory",
    aliases: ["inv"],
    description: `Check your inventory.`,
    timeout: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const datap = await profileSchema.findOne({
            userid: message.author.id
        })
        if(!datap) return message.reply({content: `You do not have any items.`})
        const itemArray = datap.items
        if(itemArray.length == 0) return message.reply({content: `You do not have any items.`})
        const ar = []

        itemArray.map((i, index) => ar.push(`**${index + 1}.** ${i.name} \`x${i.count}\``))
        const embe = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(ar.join('\n'))
        message.reply({ embeds: [embe] })
    },
};
