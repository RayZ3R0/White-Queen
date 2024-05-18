const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("channelCreate", function (channel) {
    const embed = new MessageEmbed()
        .setTitle('Channel Created')
        .setDescription(`**${channel.name}**`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(channel.id)
    console.log(`channelCreate: ${channel}`);
    const channelIs = client.channels.cache.get("901841601603731456");
    channelIs.send({
        embeds: [embed]
    })
});