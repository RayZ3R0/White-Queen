const { Message, Client, MessageEmbed } = require("discord.js");
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
const spiritImages = {
    "Kurumi Tokisaki": "https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif",
    'Kotori Itsuka': 'https://c.tenor.com/HGrptWks7wYAAAAC/kotor-kotori-itsuka.gif',
    'Miku Izayoi': 'https://c.tenor.com/If7aFNHrWQ4AAAAC/date-a-live-miku-izayoi.gif',
    'Kyouno Natsumi': 'https://c.tenor.com/5AnJ7qdLJM8AAAAd/natsumi-luckey-queen.gif',
    'Nia Honjou': 'https://c.tenor.com/JeVhDCfN7rEAAAAd/date-a-live-nia-honjou.gif',
    'Kaguya Yamai': 'https://c.tenor.com/tTb9YHNtCb4AAAAC/yuzuru-yamai-kaguya-yamai.gif',
    'Yuzuru Yamai': 'https://c.tenor.com/7rzyPBPlkUkAAAAC/date-a-live-yuzuru-yamai.gif',
    'Mukuro Hoshimiya': 'https://c.tenor.com/cTR32VHj5tgAAAAC/date-a-live-dal.gif',
    'Tobiichi Origami': 'https://c.tenor.com/_QXMqWcB5foAAAAd/tobiichi-origami-catty-girlfriend.gif',
    'Himekawa Yoshino': 'https://c.tenor.com/1lllH_v6rXsAAAAC/yoshino-date-a-live-spirit-pledge.gif',
    'Tohka Yatogami': 'https://c.tenor.com/r_uDlLNAUrkAAAAC/yatogami-tohka-date-a-live.gif',
}
module.exports = {
    name: "date",
    description: `Date your spirits to keep them happy~`,
    timeout: 60,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    const randomhappiness = randomizer(25, 100)
    const profileSearch = await profileSchema.findOne({ userid: message.author.id })
    if (!profileSearch) return message.reply({content: `You have not started playing. Use the start command and summon a spirit to get started. If you have started, then select a spirit with the select command to date.`});;
    const spiritSearch = await spiritSchema.findOne({ id: profileSearch.selected })
    if(!spiritSearch) return message.reply({content: `You do not have a spirit selected. Use \`harem\` command to check your spirits. Use \`select\` to select a spirit.`});
    
    const currenthappiness = spiritSearch.happiness + randomhappiness
    const sus = await spiritSchema.findOneAndUpdate({ id: profileSearch.selected }, {
        happiness: currenthappiness <= 100 ? currenthappiness : 100
    })
    const embed = new MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`You had a nice time with **${spiritSearch.name}**~ Her happiness level is now **${currenthappiness <= 100 ? currenthappiness : 100}**`)
    .setFooter({text: `Keep your spirits happy by dating~`})
    .setImage(spiritImages[spiritSearch.name])
    message.reply({embeds: [embed]})

    },
};




function randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
