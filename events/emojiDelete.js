const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("emojiDelete", function (emoji) {
    const link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}?size=64`

    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Emoji Deleted`)
        .setDescription(`**Name:** ${emoji.name}\n **Emoji ID:** ${emoji.id}`)
        .setThumbnail(link)
        .setTimestamp()
    const channelIs = client.channels.cache.get("902045721983844382");
    channelIs.send({
        embeds: [embed]
    })

});