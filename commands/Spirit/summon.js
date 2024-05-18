const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const economy = require('discord-bot-eco');
const profileSchema = require('../../schema/profile');

const summonCost = 2500;
module.exports = {
  name: 'summon',
  description: 'Summon a spirit.',
  timeout: 10,
  /**
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (client, message, args) => {

    const datap = await profileSchema.findOne({
      userid: message.author.id
    })
if (!datap) return message.reply({ content: `You have not started yet, use the \`start\` command to get started!` })
    const balance = datap.balance
    if (balance < summonCost) return message.reply({ content: `You do not have enough Spirit Coins to summon. You require \`${summonCost}\` Spirit Coins to summon.` })

    await profileSchema.findOneAndUpdate(
      {
        userid: message.author.id
      },
      {
        balance: datap.balance - summonCost
      }
    )

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

    const spirits = ['Kurumi Tokisaki', 'Tohka Yatogami', 'Himekawa Yoshino', 'Kotori Itsuka', 'Kaguya Yamai', 'Yuzuru Yamai', 'Miku Izayoi', 'Kyouno Natsumi', 'Mukuro Hoshimiya', 'Nia Honjou']
    let summoned = spirits[Math.floor(Math.random() * spirits.length)]
    let spiritStar

    const starChance = Math.ceil(Math.random() * 100)
    if (starChance <= 50) spiritStar = 1
    else if (starChance > 50 && starChance <= 75) spiritStar = 2
    else if (starChance > 75 && starChance <= 88) spiritStar = 3
    else if (starChance > 89 && starChance <= 96) spiritStar = 4
    else if (starChance > 97 && starChance <= 100) spiritStar = 5

    const spiritList = await spiritSchema.find({ husband: message.author.id, name: summoned })
    let convertitems = false
    spiritList.forEach(c => {
      if (spiritStar <= c.stars) convertitems = true
    })
    if (convertitems == false) {
      const data = new spiritSchema({
        name: summoned,
        husband: message.author.id,
        stars: spiritStar > 0 ? spiritStar : 1,
        happiness: 100,
        id: Math.floor(Math.random() * Date.now()).toString(36),
        skin: 'Normal',
        attackboost: 0,
        defenceboost: 0,
        agilityboost: 0,
        spiritPowerBoost: 0,
        items: [],
        nickname: 'None',
      });
      data.save()
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Initiating Summon~`)
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setImage(`https://cdn.discordapp.com/attachments/1009408632317804544/1012665603347185664/ezgif.com-gif-maker_14.gif?size=4096`)
      const embeda = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`\nYou have successfully summoned **${summoned} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritStar > 0 ? spiritStar : 1)}】**\n`)
        .setTitle(`Successful Summoning!`)
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setImage(spiritImages[summoned])
      const sus = await message.reply({ embeds: [embed] })
      setTimeout(async () => {

        sus.edit({ embeds: [embeda] })

      }, 6000)

    } else {
      const datap = await profileSchema.findOne({
        userid: message.author.id
    })
    const itemArray = datap.items
    const findItem = itemArray.find(c => c.name === `${summoned} Shards`)
    if(!findItem) {
      await itemArray.push({
        name: `${summoned} Shards`,
        count: spiritStar
      })
    } else {
      await itemArray.splice(itemArray.indexOf(findItem), 1)
      await itemArray.push({
        name: `${summoned} Shards`,
        count: findItem.count + spiritStar
      })
    }
    await profileSchema.findOneAndUpdate(
        {
            userid: message.author.id
        },
        {
            items: itemArray
        }
    )
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Initiating Summon~`)
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setImage(`https://cdn.discordapp.com/attachments/1009408632317804544/1012665603347185664/ezgif.com-gif-maker_14.gif?size=4096`)
  const embeda = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`\nYou have received \`${spiritStar}\` **${summoned} Shards**!\n`)
    .setTitle(`Successful Summoning!`)
    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setImage(spiritImages[summoned])
  const sus = await message.reply({ embeds: [embed] })
  setTimeout(async () => {

    sus.edit({ embeds: [embeda] })

  }, 6000)
    }
  },
};