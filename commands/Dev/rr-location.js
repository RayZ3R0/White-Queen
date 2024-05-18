const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
        name: 'rr-location',
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
            const channelr = client.channels.cache.get("747676875060674630");
            const messageR = channelr.messages.fetch("901372325142880288")

                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Pick your Location roles!')
                    //.setDescription('')
                    .addField('Asia', 'Take this role if you are from the Asian continent.')
                    .addField('Europe', 'Take this role if you are from the European continent.')
                    .addField('North America', 'Take this role if you are from the North American continent..')
                    .addField('South America', 'Take this role if you are from the South American continent.')
                    .addField('Africa', 'Take this role if you are from the African continent.')
                    .addField('Australia', 'Take this role if you are from the Australian continent.')
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('asia')
                        .setLabel('Asia')
                        .setStyle('SUCCESS'),
                        new MessageButton()
                        .setCustomId('europe')
                        .setLabel('Europe')
                        .setStyle('PRIMARY'),
                        new MessageButton()
                        .setCustomId('northamerica')
                        .setLabel('North America')
                        .setStyle('DANGER'),
                        new MessageButton()
                        .setCustomId('southamerica')
                        .setLabel('South America')
                        .setStyle('SUCCESS'),
                        new MessageButton()
                        .setCustomId('africa')
                        .setLabel('Africa')
                        .setStyle('PRIMARY'),
                    );
                const row2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('australia')
                        .setLabel('Australia')
                        .setStyle('DANGER'),
                    );
                message.channel.send({
                    embeds: [embed],
                    components: [row, row2]
                })
message.delete()
            },
        };