const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
module.exports = {
    name: 'sharden',
    description: 'Convert a spirit to shards.',
    usage: `<spiritID>`,
    timeout: 10,
    ownerOnly: false,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const susa = await spiritSchema.findOne({ id: args[0] })
        if(!susa) return message.reply({content: `Invalid ID.`})
console.log(susa.husband)
        if (susa.husband === message.author.id) {
        message.channel.send({ content: `Successfully shardened **${susa.name}**【${'<a:starSpin:1006138461234937887>'.repeat(susa.stars)}】 to \`${susa.stars}\` **${susa.name} Shards**` })
        await spiritSchema.deleteOne({id: args[0]})
        
      const datap = await profileSchema.findOne({
        userid: susa.husband
    })
    const itemArray = datap.items
    const findItem = itemArray.find(c => c.name === `${susa.name} Shards`)
    if(!findItem) {
      await itemArray.push({
        name: `${susa.name} Shards`,
        count: susa.stars
      })
    } else {
      await itemArray.splice(itemArray.indexOf(findItem), 1)
      await itemArray.push({
        name: `${susa.name} Shards`,
        count: findItem.count + susa.stars
      })
    }
    await profileSchema.findOneAndUpdate(
        {
            userid: susa.husband
        },
        {
            items: itemArray
        }
    )
} else {
message.reply({ content: `You cannot sharden a spirit who is married to another person. Don't be a thief bitch.` })
}

    },
};