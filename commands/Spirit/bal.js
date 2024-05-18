const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require('discord-bot-eco');
const profileSchema = require('../../schema/profile');
module.exports = {
    name: "wallet",
    aliases: ["bal", 'balance'],
    description: `Check your balance, or someone else's`,
    usage: `[@user]`,
    timeout: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const usera = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        
        const datap = await profileSchema.findOne({
            userid: usera.id
        })
        let bala;
        if (datap) bala = datap.balance
        else bala = 0
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**Spirit Coins:** \`${bala}\``)
        .setAuthor({name: `${usera.username}'s Balance`, iconURL: usera.displayAvatarURL({dynamic: true})})
        .setFooter({text: `Tip: You can boost the server for double daily reward~`})
        message.reply({embeds: [embed]});
    },
};
