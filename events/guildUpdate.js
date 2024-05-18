const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require('../index')

client.on("guildUpdate", function (oldGuild, newGuild) {
    console.error(`a guild is updated`);
    const oldname = oldGuild.name;
    const newname = newGuild.name;
    const newPfp = newGuild.iconURL({
        dynamic: true,
        size: 1024
    })
    const oldPfp = oldGuild.iconURL({
        dynamic: true,
        size: 1024
    })
    if (oldname !== newname) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Guild Name Changed')
            .addField('Previous name', `${oldname}`)
            .addField('New name', `${newname}`)
        const channelIs = client.channels.cache.get("902045721983844382");
        channelIs.send({
            embeds: [embed]
        })
    }

    if (oldPfp !== newPfp) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Guild Icon Changed')
            .setThumbnail(`${oldPfp}`)
            .setImage(newPfp)
        const channelIs = client.channels.cache.get("902045721983844382");
        channelIs.send({
            embeds: [embed]
        })
    }
});