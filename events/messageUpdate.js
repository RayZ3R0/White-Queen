const client = require('../index')
const Discord = require('discord.js')
const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/905459205295702066/uiYaVNMBa_2AZzQJbrTSiUcC8zK_UEUxmZKSDmcEbbhUvUg1VBYFrUBUsjgLQCIt8-MO'});

client.on("messageUpdate", (oldMessage, newMessage) => {

    if (oldMessage.author.bot) return;
    if (oldMessage.channel.type == "dm") return;
    
    let log = new Discord.MessageEmbed()
        .setTitle(`Message Edited in #${oldMessage.channel.name}`)
        .setAuthor(`${oldMessage.author.username}`, `${oldMessage.author.displayAvatarURL({dynamic:true})}`)
        .setDescription(
            " \n\n Previous Message: " +
                `\`\`\`${oldMessage}\`\`\`` +
                "\n\n New Message:: " +
                `\`\`\`${newMessage}\`\`\``
        )
        .setColor("RANDOM");
    hook.send({embeds: [log]});
});