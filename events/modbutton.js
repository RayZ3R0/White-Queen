const client = require('../index')
const { CommandInteraction, Client } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    const rMember = interaction.guild.members.cache.get(interaction.user.id)
    if (interaction.customId === 'mod-app') {
        const modal = new Modal()
            .setCustomId("mod-application")
            .setTitle(`Mod Application`)
            .addComponents([
                new TextInputComponent()
                    .setCustomId("gender")
                    .setLabel("What is your gender?")
                    .setStyle("SHORT")
                    .setMinLength(4)
                    .setMaxLength(6)
                    .setPlaceholder("Male or Female")
                    .setRequired(true),
                new TextInputComponent()
                    .setCustomId("age")
                    .setLabel("What is your age?")
                    .setStyle("SHORT")
                    .setMinLength(2)
                    .setMaxLength(2)
                    .setPlaceholder("Must be 13 or above")
                    .setRequired(true),
                new TextInputComponent()
                    .setCustomId("answer")
                    .setLabel(`Why do you want to be a mod?`)
                    .setStyle("LONG")
                    .setMinLength(15)
                    .setMaxLength(400)
                    .setPlaceholder("Your reason for wanting to be a mod")
                    .setRequired(true),
                new TextInputComponent()
                    .setCustomId("what")
                    .setLabel(`What can you do as a mod?`)
                    .setStyle("LONG")
                    .setMinLength(15)
                    .setMaxLength(400)
                    .setPlaceholder("How can you be of benefit?")
                    .setRequired(true),
                new TextInputComponent()
                    .setCustomId("action")
                    .setLabel(`What will you do if someone breaks a rule?`)
                    .setStyle("LONG")
                    .setMinLength(15)
                    .setMaxLength(500)
                    .setPlaceholder("Write in details")
                    .setRequired(true),
            ]);

        showModal(modal, {
            client: client,
            interaction: interaction,
        });
    }
});