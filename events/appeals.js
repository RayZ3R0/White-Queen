const client = require('../index')
//const { Modal, TextInputComponent, showModal } = require('discord-modals')
const {Message, MessageEmbed, MessageActionRow, MessageButton, Permissions, Modal, TextInputComponent } = require('discord.js')
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    //interaction.deferUpdate()
    const ress = new TextInputComponent()
                .setCustomId("res")
                .setLabel("Why were you banned?")
                .setStyle("PARAGRAPH")
                .setMinLength(15)
                .setMaxLength(500)
                .setPlaceholder("Reason")
                .setRequired(true)
    const whyy = new TextInputComponent()
                .setCustomId("why")
                .setLabel("Why should we unban you?")
                .setStyle("PARAGRAPH")
                .setMinLength(15)
                .setMaxLength(500)
                .setPlaceholder("Misunderstanding? Mod Abuse?")
                .setRequired(true)
    const firstActionRow = new MessageActionRow().addComponents(ress);
	const secondActionRow = new MessageActionRow().addComponents(whyy);
    if (interaction.customId === 'appeal') {
        const modal = new Modal()
        .setCustomId("ban-appeal")
        .setTitle(`Ban Appeal`)
        .addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
    }
});


client.on('interactionCreate', async (interaction) => {
    if (interaction.customId == "ban-appeal") {
        const reason = interaction.fields.getTextInputValue('res');
	    const whyso = interaction.fields.getTextInputValue('why');
        


        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Ban Appeal`)
            .setDescription(`Sent by <@${interaction.user.id}>`)
            .addField("Reason for being banned", `${reason}`, false)
            .addField("Why they would like to get unbanned", `${whyso}`, false)
            
            
        const servah = client.guilds.cache.get('747480292171710654')
        const channel =
            servah.channels.cache.get("970640479463022613");

        channel.send({ embeds: [embed] });

        await interaction.deferReply({ ephemeral: true });
        interaction.followUp("Your appeal was successfully submitted.");
    }
})