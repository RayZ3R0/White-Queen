const client = require("../index");
const simplydjs = require('simply-djs')

client.on('messageReactionAdd', function (reaction, user) {
    simplydjs.starboard(client, reaction, {
        event: 'messageReactionAdd',
        chid: '909828472145338398',
        embedColor: '#ff0000',
        min: 2,
      })
})
client.on('messageReactionRemove', function (reaction, user) {
    simplydjs.starboard(client, reaction, {
        event: 'messageReactionRemove',
        chid: '909828472145338398',
        min: 2,
      })
})
client.on('messageDelete', function (message) {
    simplydjs.starboard(client, message, {
        event: 'messageDelete',
        chid: '909828472145338398',
      })
})
