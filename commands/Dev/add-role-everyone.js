const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
  name: 'add-role-everyone',
 // aliases: [' '],
  description: 'No.',
 // timeout: 3000,
 // usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    const owners = [
        '636598760616624128'
    ]
    if (!owners.includes(message.author.id)) return;
    let role =
    message.guild.roles.cache.find((r) => r.name == args[1]) ||
    message.guild.roles.cache.find((r) => r.id == args[1]) ||
    message.mentions.roles.first();

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `My role is not high enough than **${
          role.name
        }** role!`);
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `Your role must be higher than **${
          role.name
        }** role!`);
    }

    if (!role) {
      return message.channel.send("Please provide a valid role");
    }
    let type = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Bots")
        .setCustomId("bot"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Members")
        .setCustomId("member")
    );
    let embed = new MessageEmbed().setDescription(
      "Choose who gets the roles."
    );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [type]
    });
    let filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter
    });
    collector.on("collect", async i => {
      if (i.customId === "member") {
        await i.deferUpdate()
        message.guild.members.cache
          .filter(member => !member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return message.channel.send(
          `Successfully Added **${
            role.name
          }** to Members`);
      }
      if (i.customId === "bot") {
        await i.deferUpdate()
        message.guild.members.cache
          .filter(member => member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return message.channel.send(
          `Successfully Added **${
            role.name
          }** to Bots`);
      }
    });
  },
};