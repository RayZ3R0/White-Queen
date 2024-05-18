const client = require("../index");
const { MessageEmbed } = require("discord.js");
const warndb = require("../schema/warndb");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const rMember = message.guild.members.cache.get(message.author.id)
  const pass = message.guild.roles.cache.find(c => c.name === "Word Pass")
  if (rMember.roles.cache.has(pass.id)) return;
  const chan = message.guild.channels.cache.find(c => c.name === '『🔞』nsfw') || message.guild.channels.cache.find(c => c.name === 'nsfw')
  if (message.channel.id === chan.id) return;
  const arr1 = message.content.toLowerCase().split(" ");
  const arr2 = [
    "ass-fucker", "assfucker", "assfukka", "beastial",
    "beastiality", "bellend", "bestial", "bestiality",
    "boiolas", "bollock", "bollok",
    "buceta", "bugger", "bum", "bunny fucker",

    "carpet muncher", "cawk", "chink", "cipa", "cunilingus", "cunillingus",
    "cunnilingus", "cuntlick", "cuntlicker", "cuntlicking", "cyalis",
    "dirsa", "dog-fucker",
    "donkeyribber", "doosh", "duche", "dyke", "fag", "fagging",
    "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker",
    "fanyy", "fecker", "felching", "fellate", "fellatio",
    "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks",
    "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks",
    "flange", "gangbang", "gangbanged", "gangbangs",
    "gaylord", "gaysex", "goatse",
    "hardcoresex", "heshe", "hoar", "hoare", "hoer", "hoe", "hore",
    "kawk",
    "kunilingus",

    "n1gga",
    "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz",
    "nigger", "niggers", "nutsack", "penisfucker",
    "pigfucker",
    "pimpis", "pissflaps",
    "pron", "rimjaw",
    "scroat", "scrote", "scrotum", "slut", "sluts",
    "twathead", "twatty", "twunt", "twunter", "whoar", "whore", "kneeger", "neeger",
    "neger", "niiger", "knigger", "kneger", "kneegger", "niggerfag", "fagnigga", "kneegear", "knee gear", "kneeger"];
  const found = arr1.some((r) => arr2.indexOf(r) >= 0);

  if (found) {
    message.delete();
    const embed = new MessageEmbed()
      .setTitle("**No bad words in general.**")
      .setColor("RED");
    message.author.send({ embeds: [embed] });
  } else {
    return;
  }

  const reason = "Bad words";
  const user = message.member;
  const moderator = client.user.id;

  warndb.findOne(
    {
      guild: message.guild.id,
      user: user.user.id,
    },
    async (err, data) => {
      if (err) throw err;
      if (!data) {
        data = new warndb({
          guild: message.guild.id,
          user: user.user.id,
          content: [
            {
              moderator: moderator,
              reason: reason,
              time: Math.floor(Date.now() / 1000),
              id: Math.floor(Math.random() * Date.now()).toString(36),
            },
          ],
        });
      } else {
        const object = {
          moderator: moderator,
          reason: reason,
          time: Math.floor(Date.now() / 1000),
          id: Math.floor(Math.random() * Date.now()).toString(36),
        };
        data.content.push(object);
      }
      data.save();

      if (data.content.length > 3 && data.content.length < 6) {
        const time = 60000;

        await message.member.timeout(time, `bad words`)
        message.author.send({
          content: `${message.author} You have been muted for using bad words.`
        });

        const embedjee = new MessageEmbed()

          .setAuthor(
            "Warning",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .addField(
            "Action",
            `${user} is now muted for 1 minute.`
          )
          .setTimestamp()
          .setFooter(`Warned ${message.author.username}`);

        message.channel.send({ embeds: [embedjee] });

      } else if (data.content.length > 5 && data.content.length < 8) {
        const timee = 2 * 60 * 1000;
        await message.member.timeout(timee, `bad words`)
        message.author.send({
          content: `${message.author} You have been muted for using bad words.`
        });

        const embedjee = new MessageEmbed()

          .setAuthor(
            "Warning",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .addField(
            "Action ",
            `${user} has been muted for 2 minutes`
          )
          .setTimestamp()
          .setFooter(`Warned ${message.author.username}`);

        message.channel.send({ embeds: [embedjee] });

      } else if (data.content.length > 7) {
        if (user) {
          const reden = "Too many warns.";

          await user
            .kick({
              reason: reden,
            })
            .then(() => {
              const banEmbed = new MessageEmbed()

                .setColor("#34e628")
                .setAuthor({
                  name: user.user.username,
                  iconURL: user.displayAvatarURL({ dynamic: true, size: 512 })
                })
                .setDescription(`${user}` + " has been kicked due to too many warns!")
                .addField("\u200b", "\u200b", true)
                .setTimestamp()
                .setFooter({ text: `Bai bai~` });

              message.channel.send({ embeds: [banEmbed] });
            });
        } else {
          const embed2 = new MessageEmbed()
            .setColor("RED")
            .setDescription("User not found");
          message.channel.send({ embeds: [embed2] });
        }
      } else {
        const embed12 = new MessageEmbed()
          .setAuthor(
            "Warnings",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .setTimestamp()
          .setFooter(`Warned`);

        message.channel.send({ embeds: [embed12] });
      }
    }
  );
});
