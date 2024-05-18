const client = require('../index')
const simplydjs = require("simply-djs");
client.on('interactionCreate', async interaction => {
    simplydjs.clickBtn(interaction, {
        embedDesc: "Your ticket has been created. Please ask away, we will try our best to help you.",
        embedColor: "#ff0000", // default: #075FFF
        closeColor: "DANGER",
        delColor: "DANGER",
        delEmoji: "852086120572518430", // default: ❌
        openColor: "PRIMARY",
        timeout: false,
        cooldownMsg: "You have already opened a ticket, go back to that one. <:kurumishoot:781499631578251285>",
        categoryID: "968036263678591036",
        role: "920210140093902868",
        //pingRole: "920210140093902868",
        ticketname: "ticket-{username}", // Custom Ticket name. {tag} | {id} | {username}
        credit: false,
        logChannel: '968035984237264966'
      });
});