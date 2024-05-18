const client = require('../index')
const simplydjs = require("simply-djs");
const { Database } = require("quickmongo");
const mongoURL = process.env['mongo']
const db = new Database(mongoURL); 
const { MessageEmbed } = require('discord.js')

const embed1 = new MessageEmbed().setTitle('You can bump again now!').setColor('RANDOM')
const emb2 = new MessageEmbed().setTitle('Thank you for bumping!').setDescription('You will be reminded again in 2 hours.').setColor('RANDOM')

client.on('ready', () => {

  simplydjs.bumpSystem(client, db, {
    event: "ready",
    chid: ["747780089151881258"],
    content: '<@&903144348647055410>',
    bumpEmbed: embed1,
    thanksEmbed: emb2
  });
})

client.on('messageCreate', function (message) {
// messageCreate event
simplydjs.bumpSystem(client, db, {
  event: "messageCreate",
  message: message,
  chid: ["747780089151881258"],
  bumpEmbed: embed1,
  thanksEmbed: emb2,
})
});
