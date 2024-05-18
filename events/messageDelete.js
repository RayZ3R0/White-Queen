const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageAttachment
} = require("discord.js");
const client = require('../index')

client.on("messageDelete", function (message) {
    if(message.attachments.size > 0) {
    const atta = new MessageAttachment(message.attachments.first().url, 'image.png')
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Message Deleted in #${message.channel.name}`)
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({dynamic:true})}`)
        .setDescription(message.content ? `\`\`\`${message}\`\`\`` : ``)
        .setImage('attachment://image.png' || null)
        .setFooter(`${message.id}`)
        .setTimestamp();
    const channelIs = client.channels.cache.get("901841617449799680");
    channelIs.send({
        embeds: [embed],//aaa
        files: [atta]
    })
}
else {
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Message Deleted in #${message.channel.name}`)
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({dynamic:true})}`)
        .setDescription(message.content ? `\`\`\`${message}\`\`\`` : ``)
        .setFooter(`${message.id}`)
        .setTimestamp();
    const channelIs = client.channels.cache.get("901841617449799680");
    channelIs.send({
        embeds: [embed]
    })
}
});