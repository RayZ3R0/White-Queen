const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("channelPinsUpdate", function (channel, time) {
    console.log(`channelPinsUpdate: ${channel}:${time}`);
    const emebed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Channel pins were updated:\n**Channel:** ${channel.name}\n **Time:** ${time}`)
        .setTimestamp()
    const channelIs = client.channels.cache.get("901841601603731456");
    channelIs.send({
        embeds: [emebed]
    })
});