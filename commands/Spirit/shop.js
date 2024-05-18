/* const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require('discord-bot-eco');
const { pagination } = require('reconlx')
module.exports = {
    name: "shop",
    timeout: 10,
    run: async (client, message, args) => {
        console.log(await economy.getShop())
        const data = await economy.getShop()
		let embed = new MessageEmbed()
        .setTitle(`SHOP`)
        .setFooter({text: `♥`})
        .setTimestamp();
        const moneh = await economy.get(message.author.id, "wallet")
const embe = []
    data.map(item => {
        
        let ava;
        if(moneh < item.itemBuyPrice) ava = `You need \`${item.itemBuyPrice - moneh}\` more to buy.`
        else ava = `You can buy this item.`
        embe.push( new MessageEmbed().setColor('DARK_RED').setTitle(`${item.itemName}`).addField('Description', `${item.itemDescription}`).addField(`Price`, `${item.itemBuyPrice} Spirit Coins`).addField(`Availability`, `${ava}`).setFooter({text: `Use the buy command to buy an item.`}));
    });
    pagination({
        embeds: embe,
        message: message,
        channel: message.channel,
        author: message.author,
        fastSkip: true,
        time: 60000,
        button: [
          {
            name: "first",
            emoji: '911637785037910077',
            style: "PRIMARY",
          },
          {
            name: "next",
            emoji: "911640141007839273",
            style: "SUCCESS",
          },
          {
            name: "previous",
            emoji: "911640280434892850",
            style: "SUCCESS",
          },
          {
            name: "last",
            emoji: "911637840176250890",
            style: "PRIMARY",
          }
        ]
    })
    },
};*/