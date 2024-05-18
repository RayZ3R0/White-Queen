const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
  name: 'mod-app',
  //aliases: [' '],
  description: 'No.',
  timeout: 3,
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

        const embed = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle('Mod Application')
            .setDescription(`Click the button below to start your mod applications. If your applications are good enough you will be given trial mod, and if you are good enough you will be promoted. <:KuruSip:954987812640415744>`)
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('mod-app')
                .setLabel('Apply')
                .setStyle('DANGER'),
            );
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
message.delete()
  },
};