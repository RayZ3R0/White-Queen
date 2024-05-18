const client = require("../index");
const cooldownSchema = require("../schema/cmdcooldown")
const prettyMilliseconds = require('pretty-ms');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
client.on("interactionCreate", async (interaction) => {
	// Slash Command Handling
	if (interaction.isCommand()) {
		await interaction.deferReply().catch(() => {});

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd) {return interaction.reply({ content: "An error has occured " });}

		const args = [];

		for (const option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			}
			else if (option.value) {args.push(option.value);}
		}
		interaction.member = interaction.guild.members.cache.get(interaction.user.id);

		if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.reply({
			content: "You don't have permissions to use this command."
		})
    const cd = cmd.cooldown || 3;
	if (cd) {

		let cooldown;
		try {
		  cooldown = await cooldownSchema.findOne({
			userID: interaction.user.id,
			commandName: cmd.name
		  })
		  if(!cooldown) {
			cooldown = await cooldownSchema.create({
			  userID: interaction.user.id,
			  commandName: cmd.name,
			  cooldown: 0
			})
			cooldown.save()
		  }
		} catch (e) {
		  console.error(e)
		}
  
		if(!cooldown || cd * 1000 - (Date.now() - cooldown.cooldown) > 0) {
		let timecommand = prettyMilliseconds(cd * 1000, { verbose: true, verbose :true })
  
		  const timeleft = prettyMilliseconds(cd * 1000 - (Date.now() - cooldown.cooldown), {verbose:true})
  
		  let cooldownMessage =  cmd.cooldownMsg ? cmd.cooldownMsg.description : `You can use this command every **${timecommand}**!\n> Try again in: **${timeleft}** `;
  
		  let cooldownMsg = cooldownMessage.replace("[timeleft]", `${timeleft}`).replace("[cooldown]", `${timecommand}`)/*.replace("[user]", `${interaction.user.username}`)*/
  
		  let cooldownEmbed = new MessageEmbed()
		  .setTitle(`${cmd.cooldownMsg ? cmd.cooldownMsg.title : "Slow Down!"}`)
		  .setDescription(cooldownMsg)
		  .setColor(`${cmd.cooldownMsg ? cmd.cooldownMsg.color : "RED"}`)
		  return interaction.reply({embeds: [cooldownEmbed]})
	  } else {
		cmd.run(client, interaction, args);
		await cooldownSchema.findOneAndUpdate({
		  userID: interaction.user.id,
		  commandName: cmd.name
		}, {
		  cooldown: Date.now()
		})
	  }
  } else {
	cmd.run(client, interaction, args);
  }

		//cmd.run(client, interaction, args);
	}

	// Context Menu Handling
	if (interaction.isContextMenu()) {
		const command = client.slashCommands.get(interaction.commandName);
		await interaction.deferReply({ ephemeral: command.ephemeral ? command.ephemeral : false });
		if (command) command.run(client, interaction);
	}
	
if (interaction.isAutocomplete()) {
	const userInput = interaction.options.getFocused().toString();
	const getFullInput = interaction.options.getFocused(true);

	switch (interaction.commandName) {
		case 'npm':
			const text = getFullInput.name === 'package' ? getFullInput.value : interaction.options.getString('package');
			let url = await fetch(`https://api.npms.io/v2/search?q=${text}`).then(response => response.json());

			if (!text) {
				return interaction.respond([{
					name: 'Type the name of an npm package for more options to show!',
					value: userInput
				}])
			} else {
				const filtered = url.results.filter(x =>
					x.package.name?.toLowerCase().includes(text.toLowerCase())
				)

				await interaction.respond(
					filtered.map(choice => ({
						name: choice.package.name,
						value: choice.package.name
					})).slice(0, 25)
				).catch(err => {
					console.log(err.message)
				})

			}
	}
}
});

