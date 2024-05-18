const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const model = require('../../schema/lockdownChannels');
const { nanoid } = require('nanoid');

//const lockID = '780066088393113610'

module.exports = {

name: 'lockdown',
run: async(client, message, args) => {

      if(!message.member.permissions.has("BAN_MEMBERS")) return;
      //const lockRole = message.guild.roles.cache.find(ro => ro.id === lockID);

      let reason = args[0];
      if(!reason) return message.reply({
            embeds: [
                  new MessageEmbed()
                  .setColor("RED")
                  .setTitle("Missing arguments")
                  .setDescription(`Types of arguments:\n\n\`lockdown list\`\n\`lockdown add [channel]\`\n\`lockdown remove [channel]\`\n\`lockdown [reason]\`\n\`lockdown off\``)
            ]
      })
      if(reason.toLowerCase() === "list") {

            const list = await model.findOne({ guildID: message.guild.id });
            if(!list) return message.reply({
                embeds: [
                      new MessageEmbed()
                      .setAuthor("Lockdown Channels")
                      .setDescription(`There are no channels to lock.`)
                ]
          });
      
            await message.reply({
                  embeds: [
                        new MessageEmbed()
                        .setAuthor("Lockdown Channels")
                        .setDescription(`${list.channels.map(x => `<#${x}>`).join("\n") || `There are no channels to lock.`}`)
                  ]
            });
      } else if(reason.toLowerCase() === "add") {

            try {

            const list = await model.findOne({ guildID: message.guild.id });
            if(!list) {
                  const embed = await message.reply({ embeds: [
                  new MessageEmbed()
                  .setColor("RED")
                  .setDescription("There is no data, creating data...")
            ]})

            new model({
                  guildID: message.guild.id,
                  channels: []
            }).save();
            
            setTimeout(async() => await embed.edit({
                  embeds: [
                        new MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor("Data Created ✅")
                        .setDescription("Please run this command again for this to work.")
                  ]
            }), 3000);

            return;
      }

            let channel = message.mentions.channels.first() || await message.guild.channels.fetch(args[1]);
            if(!args[1]) return;

            const channels = list.channels;

            await model.findOne({ guildID: message.guild.id }, async(err, data) => {
                  if(data) { 
                        const hasItem = data.channels.includes(channel.id);
            if(!hasItem) {
                  data.channels.push(channel.id)
        } else {
            return message.channel.send({
                  embeds: [
                        new MessageEmbed()
                        .setColor("RED")
                        .setDescription("This channel is already on the lockdown list.")
                  ]
            });
        }
                        await message.channel.send({
                              embeds: [
                                    new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`Added <#${channel.id}> to the lockdown list.`)
                              ]
                        })
                  } else {
                        return;
                  }
                  await model.findOneAndUpdate({ guildID: message.guild.id }, data);
            }).clone().catch(function(err){ console.log(err)});

      } catch (err) {
            return;
      }

      } else if(reason.toLowerCase() === "remove") {

            try {

            console.log("test");

            const data = await model.findOne({ guildID: message.guild.id });
            if(!data) return message.reply({
                  embeds: [
                        new MessageEmbed()
                        .setColor("RED")
                        .setDescription("There are no channels on the lockdown list.")
                  ]
            });

            let Channel = message.mentions.channels.first() || await message.guild.channels.fetch(args[1]);
            if(!args[1]) return;

            const hannels = data.channels;

            let hasItem = data.channels.includes(Channel.id);
            if(!hasItem) return message.reply({
                  embeds: [
                        new MessageEmbed()
                        .setColor("RED")
                        .setDescription("This channel isn't on the lockdown list!")
                  ]
            });

            await model.findOne({ guildID: message.guild.id}, async (err, data) => {
                  if(err) throw err;
                  if(data) {
                        const index = data.channels.indexOf(Channel.id);
                        if (index > -1) {
                        data.channels.splice(index, 1);
                        }
                  } else {
                        return;
                  }
                  await model.findOneAndUpdate({ guildID: message.guild.id }, data);

                  await message.channel.send({
                        embeds: [
                              new MessageEmbed()
                              .setColor("GREEN")
                              .setDescription(`Removed <#${Channel.id}> from the lockdown list.`)
                        ]
                  })
            }).clone().catch(function(err){ console.log(err)});

      } catch (err) {
            return;
      }

      } else if(reason.toLowerCase() === "off") {

            reason = undefined;

            let data = await model.findOne({ guildID: message.guild.id });
            if(!data) return message.reply({
                  embeds: [
                        new MessageEmbed()
                        .setColor("RED")
                        .setDescription("There are no channels to lock.")
                  ]
            });

            await message.delete();

            await message.channel.send({
                  embeds: [
                        new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("✅ Successfully unlocked the server.")
                  ]
            })

            data.channels.forEach(async channel => {

                  let ch = await message.guild.channels.fetch(channel);

                  if(ch.type === "GUILD_TEXT") {
                        
                        await ch.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: null });
                        
                        await ch.send({
                              embeds: [
                                    new MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`**The server has been unlocked!**`)
                              ]
                        })

                  } else if(ch.type === "GUILD_VOICE") {


                        await ch.permissionOverwrites.edit(message.guild.id, { CONNECT: null });

                  }

            })

      } else {

            reason = args.slice().join(" ");

            let data = await model.findOne({ guildID: message.guild.id });
            if(!data) return message.reply({
                  embeds: [
                        new MessageEmbed()
                        .setColor("RED")
                        .setDescription("There are no channels to unlock.")
                  ]
            });

            let YESID = `YES-${nanoid()}`;
            let NOID = `NO-${nanoid()}`;

            let row = new MessageActionRow().addComponents(
                  new MessageButton()
                  .setStyle("SUCCESS")
                  .setCustomId(YESID)
                  .setLabel("Confirm"),
                  new MessageButton()
                  .setStyle("DANGER")
                  .setCustomId(NOID)
                  .setLabel("Cancel")
            );

            const msg = await message.channel.send({
                  embeds: [
                        new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription(`Are you sure you want to place the server on lockdown?`)
                  ],
                  components: [row],
            });

            client.on("interactionCreate", async (interaction) => {
                  
                  if(interaction.isButton) {
                        
                        if(interaction.customId === YESID) {

                              await message.delete();

                              await msg.edit({
                                    embeds: [
                                          new MessageEmbed()
                                          .setColor("GREEN")
                                          .setDescription("✅ The server has been locked down.")
                                    ],
                                    components: [],
                              })

                              data.channels.forEach(async channel => {

                                    let ch = await message.guild.channels.fetch(channel);
                  
                                    if(ch.type === "GUILD_TEXT") {
                                          
                                          await ch.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
                                          
                                          await ch.send({
                                                embeds: [
                                                      new MessageEmbed()
                                                      .setColor("RED")
                                                      .setAuthor("The server is on lockdown")
                                                      .setDescription(`You are not muted, please do not contact any staff members.\n\nReason: **${reason}**`)
                                                ]
                                          })
                  
                                    } else if(ch.type === "GUILD_VOICE") {
                  
                                          await ch.permissionOverwrites.edit(message.guild.id, { CONNECT: false });
                  
                                    }
                  
                              })

                        } else if(interaction.customId === NOID) {

                              await msg.edit({
                                    embeds: [
                                          new MessageEmbed()
                                          .setColor("GREEN")
                                          .setDescription("Canceled.")
                                    ],
                                    components: [],
                              })

                        }
                  }
            })
      }

   }
}

