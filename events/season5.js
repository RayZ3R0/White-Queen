const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    const chan = message.guild.channels.cache.find(c => c.id === '962266204951699516');
    if (message.channel.id === chan.id) return;
    const rMember = message.guild.members.cache.get(message.author.id)
    const pass = message.guild.roles.cache.find(c => c.name === "Word Pass")
    if (rMember.roles.cache.has(pass.id)) return;
    const arr1 = message.content.toLowerCase().split(" ");
    const arr2 = ["dead", "die", "mio", "dies"]
    const found = arr1.some((r) => arr2.indexOf(r) >= 0);
    const embe = new MessageEmbed()
        .setColor('RANDOM')
        .setImage('https://media.discordapp.net/attachments/965509744859185262/1239137654629597184/image0-transformed.png?ex=6641d45e&is=664082de&hm=c194d7b4101a2123d8e491341b6ad9a6f757bc18b680f10dd00cb36d6d7793f9&=&quality=lossless')
        .setTitle('No Season 5 spoilers here, go to <#962266204951699516>')
        .setFooter({text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})

    if (arr1.includes("kurumi") && found) {
        message.delete()
        return message.channel.send({ content: `${message.author}`, embeds: [embe] });
    }
});
