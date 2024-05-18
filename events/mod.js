const client = require('../index')
const { CommandInteraction, MessageEmbed, Formatters  } = require("discord.js");

client.on('modalSubmit', async (interaction) => {

		if (interaction.customId == "mod-application") {
			const gender = interaction.getTextInputValue("gender");
			const age = interaction.getTextInputValue("age");
			const answer = interaction.getTextInputValue("answer");
           // const how = interaction.getTextInputValue("how");
            const what = interaction.getTextInputValue("what");
            const action = interaction.getTextInputValue("action");
          //  const example = interaction.getTextInputValue("example");
          //  const raid = interaction.getTextInputValue("raid");
            


			const embed = new MessageEmbed()
				.setColor("GREEN")
				.setTitle(`Mod Application Submission`)
				.setDescription(`Sent by <@${interaction.member.id}>`)
				.addField("Gender", `${gender}`, true)
				.addField("Age", `${age}`, true)
				.addField("Why do you want to be a mod?", `${answer}`, false)
                .addField("What can you do as a mod?", `${what}`, false)
                .addField("What will you do if someone breaks a rule?", `${action}`, false)
                
                

			const channel =
				interaction.guild.channels.cache.get("955371131089584178");

			channel.send({ embeds: [embed] });

			await interaction.deferReply({ ephemeral: true });
			interaction.followUp("Your application was successfully submitted.");
		}
})