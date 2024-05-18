const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
  name: 'rr-age',
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
            .setTitle('Pick your age roles!')
            //.setDescription('')
            .addField('13-17', 'Take this role if you are 13 to 17 years old!')
            .addField('18+', 'Take this role if you are 18+ years old!')
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('1317')
                .setLabel('13-17')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('18')
                .setLabel('18+')
                .setStyle('PRIMARY'),
            );
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
message.delete()
  },
};