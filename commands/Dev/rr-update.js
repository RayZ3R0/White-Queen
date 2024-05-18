const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
} = require('discord.js');

module.exports = {
    name: 'rr-update',
    //aliases: [''],
    description: 'No.',
    //timeout: 69,
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

        //const channelr = client.channels.cache.get("747676875060674630");
        const me = await message.channel.messages.fetch("903159127709216770")

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Pick your roles!')
            .addField('Announcement', 'Take this role to get pinged when there\'s an announcement!')
            .addField('Bot Update', 'Take this role to get pinged when there\'s any update on the bot!')
            .addField('Bumpers', 'Take this role to get pinged when you can bump again in disboard!')
            .addField('Polls', 'Take this role to get pinged for polls!')
            .addField('Dead Chat Ping', 'Take this role to get pinged to revive chat!')
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('announcement')
                .setLabel('Announcement')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('botupdate')
                .setLabel('Bot Update')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('bumpers')
                .setLabel('Bumpers')
                .setStyle('DANGER'),
                new MessageButton()
                .setCustomId('poll')
                .setLabel('Polls')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('deadc')
                .setLabel('Dead Chat Ping')
                .setStyle('PRIMARY'),
            );
            const rowa = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('blank')
                .setEmoji('902827400289734686')
                .setDisabled(true)
                .setStyle('SECONDARY'),
                new MessageButton()
                .setCustomId('event')
                .setLabel('Event')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('watcht')
                .setLabel('Watch Together')
                .setStyle('DANGER'),
                new MessageButton()
                .setCustomId('giveaway')
                .setLabel('Giveaway')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('blank2')
                .setEmoji('902827400289734686')
                .setDisabled(true)
                .setStyle('SECONDARY'),
            );
       /* message.channel.send({
            embeds: [embed],
            components: [row]
        })*/
        me.edit({
            embeds: [embed],
            components: [row, rowa]
        })
message.delete()

    },
};