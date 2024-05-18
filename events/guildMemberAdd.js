const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
/* const { welcomeImage } = require('discord-welcome-card'); */
const client = require('../index')

client.on('guildMemberAdd', async (member) => {
    //const Channel = client.channels.cache.get('775700237481410560')
    //if (member.bot/* || member.user.id == '718052809097871380'*/) return;
/* const mem = member.guild.members.cache.get(member.id) */

    /* const image = await welcomeImage(mem, {
        background: `https://i.imgur.com/5bpI2IG.png`,
        border: false,
        text: {
            title: "\u200b",
            subtitle: "\u200b"
        },
        avatar: {
            image: member.displayAvatarURL({size: 2048})
        }
    }); */
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`**${member.displayName}** welcome to ${member.guild.name}! We now have ${member.guild.members.cache.filter((user) => !user.user.bot).size.toLocaleString()} members!`)
        .setDescription(`<@${member.user.id}>, Welcome to the server, hope you enjoy your stay!`)
        .addField('** **', '- Head over to the <#747672817297915906> channel, and read all the rules please!\n\n- If you want, you can go to the <#747676875060674630> channel and get some roles!\n\n- You can start chatting in the <#839082244060217404> channel!\n\n- If you are having problems with the bot, please head over to\n <#968048918346727424> and ask for help, we will try our best to help fix the problem!')
        .setImage('https://i.imgur.com/5bpI2IG.png')
        .setThumbnail(member.displayAvatarURL({dynamic: true, size: 1024}))
    const channelIs = client.channels.cache.get("775700237481410560");

    channelIs.send({
        embeds: [embed]
    })
    
    member.roles.add('747480425114632294')
    member.roles.add('956474792834400286')
    member.roles.add('901444353552166972')
    member.roles.add('901443526976503819')
    member.roles.add('901444030490083338')
    member.roles.add('901444119468068865')
    member.roles.add('911536167365799937')
})