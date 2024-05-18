const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
  name: 'rr-gender',
  //aliases: [' '],
  //description: 'No.',
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
            .setTitle('Pick your Gender roles!')
            //.setDescription('')
            .addField('Male', 'Take this role if you are male.')
            .addField('Female', 'Take this role if you are female.')
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('male')
                .setLabel('Male')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('female')
                .setLabel('Female')
                .setStyle('DANGER'),
            );
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
message.delete()
  },
};