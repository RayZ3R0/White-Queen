const client = require("../index");
const { Collection, MessageEmbed } = require('discord.js');
const cooldownSchema = require("../schema/cmdcooldown")
const prettyMilliseconds = require('pretty-ms');

client.on("messageCreate", async (message) => {
	const prefix = ';'
	if (
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
	) {return;}

	const [cmd, ...args] = message.content
		.slice(prefix?.length)
		.trim()
		.split(/ +/g);

	const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
	let own = command.ownerOnly || false;
	const owners = [
		'636598760616624128',
	];
	if(own && !owners.includes(message.author.id)) return;
	if (!command) return;
	if (command) {
		if (command.timeout) {

			let cooldown;
			try {
			  cooldown = await cooldownSchema.findOne({
				userID: message.author.id,
				commandName: command.name
			  })
			  if(!cooldown) {
				cooldown = await cooldownSchema.create({
				  userID: message.author.id,
				  commandName: command.name,
				  cooldown: 0
				})
				cooldown.save()
			  }
			} catch (e) {
			  console.error(e)
			}
	  
			if(!cooldown || command.timeout * 1000 - (Date.now() - cooldown.cooldown) > 0) {
			let timecommand = prettyMilliseconds(command.timeout * 1000, { verbose: true, verbose :true })
	  
			  const timeleft = prettyMilliseconds(command.timeout * 1000 - (Date.now() - cooldown.cooldown), {verbose:true})
	  
			  let cooldownMessage =  command.cooldownMsg ? command.cooldownMsg.description : `You can use this command every **${timecommand}**!\n> Try again in: **${timeleft}** `;
	  
			  let cooldownMsg = cooldownMessage.replace("[timeleft]", `${timeleft}`).replace("[cooldown]", `${timecommand}`).replace("[user]", `${message.author.username}`)
	  
			  let cooldownEmbed = new MessageEmbed()
			  .setTitle(`${command.cooldownMsg ? command.cooldownMsg.title : "Slow Down!"}`)
			  .setDescription(cooldownMsg)
			  .setColor(`${command.cooldownMsg ? command.cooldownMsg.color : "RED"}`)
			  return message.channel.send({embeds: [cooldownEmbed]})
		  } else {
			command.run(client, message, args)
			await cooldownSchema.findOneAndUpdate({
			  userID: message.author.id,
			  commandName: command.name
			}, {
			  cooldown: Date.now()
			})
		  }
	  } else {
		  command.run(client, message, args)
	  }
	}
});
