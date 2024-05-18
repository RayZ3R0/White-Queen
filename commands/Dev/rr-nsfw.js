const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
  name: 'rr-nsfw',
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
    //const channelr = client.channels.cache.get("747676875060674630");
    //const messageR = await channelr.messages.fetch("942295392173838346")

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Chatbot channel access')
            .setDescription(`Take this role if you want access to the chatbot. Be aware that the chatbot uses vulgar language and constantly swears a lot.`)
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('nsfw')
                .setLabel('Chatbot')
                .setStyle('DANGER'),
            );
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
message.delete()
  },
};