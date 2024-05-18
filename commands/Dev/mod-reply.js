const {
    Util,
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
  name: 'mod-reply',
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
const mes = await message.channel.messages.fetch(args[0])
        const embed = new MessageEmbed(mes.embeds[0])
            .addField(`Reply`, `${args.slice(1).join(' ')}`)
const au = mes.embeds[0].description.split(' ')[2].replace('<', '').replace('>', '').replace('@', '')
console.log(au)
const aua = client.users.cache.get(au)
        aua.send({
            embeds: [embed]
        })
message.delete()
  },
};