const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require('discord-bot-eco');
const { pagination } = require('reconlx');

const profileSchema = require('../../schema/profile');
module.exports = {
  name: "leaderboardc",
  aliases: ['lbc'],
  description: `Check the spirit coins leaderboard.`,
  timeout: 30,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sus = await profileSchema.find()
    const lb = sus.sort((a, b) => b.balance - a.balance)

    const a1 = []
    const a2 = []
    const a3 = []
    lb.map((u, index) => {
      if (index + 1 <= 10) {
        a1.push(`**${index + 1}.** <@${u.userid}> - **${u.balance}** Spirit Coins`)
      }
      else if (index + 1 > 10 && index + 1 <= 20) {
        a2.push(`**${index + 1}.** <@${u.userid}> - **${u.balance}** Spirit Coins`)
      }
      else if (index + 1 > 20 && index + 1 <= 30) {
        a3.push(`**${index + 1}.** <@${u.userid}> - **${u.balance}** Spirit Coins`)
      }
    })
    const emb1 = new MessageEmbed()
      .setColor('RED')
      .setTitle(`Leaderboard`)
      .setDescription(`${a1.join('\n')}`)
    const emb2 = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle(`Leaderboard`)
      .setDescription(`${a2.join('\n')}`)
    const emb3 = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(`Leaderboard`)
      .setDescription(`${a3.join('\n')}`)

    pagination({
      embeds: [emb1, emb2, emb3],
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
};
