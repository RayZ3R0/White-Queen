const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("channelDelete", function (channel) {
    const embed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(`**${channel.name}**`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(channel.id)
    console.log(`channelDelete: ${channel.name}`);
    const channelIs = client.channels.cache.get("901841601603731456");
    channelIs.send({
        embeds: [embed]
    })
});