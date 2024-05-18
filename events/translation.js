const client = require('../index')
const { CommandInteraction, MessageEmbed, Formatters  } = require("discord.js");
const translate = require('@iamtraction/google-translate')
client.on('messageCreate', async (message) => {
    if (message.channel.id === '901338477021499413') {
        const trc = message.guild.channels.cache.get('978577409353863168')
        const language = 'en'
        const query = message.content
        const translated = await translate(query, { to: `${language}` });
        const embed = new MessageEmbed()
            .setFooter({text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
            .addField("Original Message:", `\`\`\`${query}\`\`\``)
            .addField("Translated Message:", `\`\`\`${translated.text}\`\`\``)
            .setColor('RANDOM')
        trc.send({embeds: [embed]})
    }
});