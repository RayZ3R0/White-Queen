const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: 'rules-initiate',
    //aliases: [' '],
    description: 'No.',
    //timeout: 3000,
    //usage: ' ',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const owners = [
            '636598760616624128'
        ]
        if (!owners.includes(message.author.id)) return;
const mes = await message.channel.messages.fetch('901438144510062613')
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('The Server Rules.')
            .setDescription('Discord ToS is enforced in this server. https://discordapp.com/terms')
            .addField('Speak English.', `Keep all communications in English as much as possible.
        - This applies to the entirety of the server.`)
            .addField('No Toxicity.', `Toxicity of any kind is not allowed.
        - Disrespecting other members, servers, or members of other servers is not allowed. 
        - Racism, Sexism, Slurs of aforementioned, Hate, Stalking, Threats, etc. is not allowed within the server, this includes in your discord profile (picture, name, playing status, custom status, banner, about me) or messages`)
            .addField('No Spam.', `Don't spam, spoil things, flood chat with CAPS or Copypasta, or line-split.`)
            .addField('Absolutely no Drama.', `Starting or participating in drama of any kind is not allowed.
        - Discussions are allowed however it must not escalate any further than a civil discussion. If it ever escalates further, take it to DMs.
        - Sensitive topics including politics, religion, school shootings, suicide, etc. is to be kept out of the server.`)
            .addField('No self-harm or explicit content.', `Do not promote cruelty, violence, self-harm, suicide, pornography, etc.
        - Jokes about self-harm, harm to others, suicide, etc. is strictly prohibited. This includes kms, kys, and other variations.
        - Epileptic emotes, harmful links (ie. Scam links, etc.) are strictly prohibited.`)
            .setImage('https://i.imgur.com/obfJXTJ.png')


        const embed2 = new MessageEmbed()
            .setColor('#ff0000')
            .addField('No Begging.', `No begging or asking for free stuff. This includes in your discord profile (picture, name, playing status, custom status, banner, about me) or messages.`)
            .addField('No Raiding.', `Raiding or planning raids on servers is strictly forbidden, even as a joke. You might find yourself on the wrong side of the banhammer.`)
            .addField('No NSFW.', `NSFW content is only allowed in <#913436035264962600> channel. Posting it in any other channel is not allowed. (posting porn or borderline porn of any kind). This also includes NSFW discord profile (picture, name, playing status, custom status, banner, about me).
        - Try to be mindful that there are minors in the server. Subjects containing sexual content like hentai, sexual talks, etc. should be kept to a minimum.`)
            .addField('No Advertising.', `Do not advertise discord servers/bots, YouTube channels, social media pages, etc. within the server.`)
            .addField('Keep things in the correct channels.', `Keep things in the correct channels as much as possible.
        - Each channel have their own set of rules so make sure to read Channel Description and Pinned messages to ensure the rules of the channel are not broken.`)
.addField('Do not DM the Council of Kurumis unnecessarily.', `Open a ticket by clicking the button in <#968048918346727424>, and ask for help in your ticket. Only the Council can see the messages in your ticket. Do not DM the Council unless absolutely necessary.`)
            .setImage('https://i.imgur.com/XdnOaDd.jpg')
            .setFooter('Failing to follow the rules might result in you being on the wrong side of the banhammer, so be careful \:). These rules don\'t include some of the extremely stupid stuff people can do, so make sure you don\'t do those either.')

        mes.edit({
            embeds: [embed, embed2]
        })

    },
};