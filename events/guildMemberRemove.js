const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on('guildMemberRemove', async (member) => {
    if (member.bot || member.user.id == '718052809097871380') return;
    //const Channel = client.channels.cache.get('775700237481410560')

    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`**${member.displayName}** Sorry to see you go.. We now have ${member.guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()} members!`)
        .setImage('https://i.imgur.com/O2r9YJr.png')
    const channelIs = client.channels.cache.get("901354934795141140");

    channelIs.send({
        embeds: [embed]
    })
})