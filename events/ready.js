const client = require("../index");
const economy = require('discord-bot-eco');

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`)



    economy.setConfig({
        mongoURL: process.env['mongo'],
        currency: " Spirit Coins",
        allowBankruptcy: false,
        limits: {
            defaultBankLimit: 3000,
            enabled: true
        },
        shopEnabled: true,
        shop: [
            {
                itemName: "A",
                itemBuyPrice: 1,
                itemBuyable: true,
                itemSellable: false,
                itemDescription: `a sus`,
            },            
        ]
    });
});
