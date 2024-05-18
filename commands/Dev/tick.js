const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const simplydjs = require("simply-djs");
module.exports = {
    name: 'tick',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        /*message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`Click the button below to open a ticket. 🎟`)
            ]
        })*/
        simplydjs.ticketSystem(message, message.channel, {
            embedDesc: "Click the button below to open a ticket. 🎟",
            embedColor: "#ff0000", // default: #075FFFF
            embedFoot: "We will try our best to help you~",
            emoji: "865096697939623936", // default:, 🎫
            color: "SUCCESS",
            credit: false
          });
        
    },
};