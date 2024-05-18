const client = require('../index')
const spamchannels = ['1006477488014249994', '1006477351716134972', '901338643128516648', '957981195604471858', '957980980201816174', '957979414812065852', '955399577895317524', '972865600680497172', '1006472847608250419', '1006473034003128340']
const spame = []
client.on('messageCreate', async (message) => {
    let xp = require('simply-xp')
if (spamchannels.includes(message.channel.id)) return;
    if (!message.guild || message.author.bot ) return;
    if(spame.includes(message.author.id)) return;
    

    xp.addXP(message, message.author.id, message.guild.id, {
        min: 5,
        max: 20
    })
    spame.push(message.author.id)
    setTimeout(async () => {
        const sus = spame.find(c => c === message.author.id)
        const deta = await spame.splice(spame.indexOf(sus), 1)
    }, 60000)
    xp.lvlRole(message, message.author.id, message.guild.id)
});

client.on('levelUp', async (message, data) => {

    message.reply(
        `Congratulations ${message.author}, You have reached level **${data.level}**.`
    )
})