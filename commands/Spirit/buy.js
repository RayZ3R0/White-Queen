const { Message, Client } = require("discord.js");
const economy = require('discord-bot-eco');
module.exports = {
    name: "buy",
    description: `Buy an item from shop.`,
    usage: `[itemName]`,
    timeout: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const bu = await economy.buy(message.author.id, args.join(' '))
        if (bu === `cannot_afford`) return message.channel.send({content: `You don\'t have enough money, die.`})
        if (bu === `not_real`) return message.channel.send({content: `That item does not exist, the fuck you tryna do?`})
        message.channel.send({content: `You have bought **${args.join(' ')}**. You now have **${bu.wallet}** Spirit Coins left.`})
    },
};
