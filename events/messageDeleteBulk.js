const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("messageDeleteBulk", function (messages) {
    console.log(`messages are deleted -> ${messages}`);
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Bulk Message Delete')
        .setDescription(`Number of messages deleted: **${messages.size}**`)
        .setTimestamp();
    const channelIs = client.channels.cache.get("901841617449799680");
    channelIs.send({
        embeds: [embed]
    })

});