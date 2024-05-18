const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("emojiUpdate", function (oldEmoji, newEmoji) {
    const oldname = oldEmoji.name;
    const newname = newEmoji.name;
    const link = `https://cdn.discordapp.com/emojis/${newEmoji.id}.${newEmoji.animated ? "gif" : "png"}?size=64`

    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Emoji Updated`)
        .setDescription(`**Previous name:** ${oldname}\n**New Name:** ${newname}`)
        .setThumbnail(link)
        .setTimestamp()
        .setFooter(newEmoji.id)
    const channelIs = client.channels.cache.get("902045721983844382");
    channelIs.send({
        embeds: [embed]
    })

});