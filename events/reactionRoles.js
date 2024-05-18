const client = require('../index')

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    const rMember = interaction.guild.members.cache.get(interaction.user.id)
    if (interaction.customId === 'nsfw') {
        if (rMember.roles.cache.has('942294539668963330')) {
            await interaction.deferUpdate()
            rMember.roles.remove('942294539668963330');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('942294539668963330')
        }
    }
    if (interaction.customId === 'announcement') {
        if (rMember.roles.cache.has('747720214912827402')) {
            await interaction.deferUpdate()
            rMember.roles.remove('747720214912827402');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('747720214912827402')
        }
    }

    if (interaction.customId === 'botupdate') {
        if (rMember.roles.cache.has('901408085191577610')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408085191577610');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408085191577610')
        }
    }
    if (interaction.customId === 'bumpers') {
        if (rMember.roles.cache.has('903144348647055410')) {
            await interaction.deferUpdate()
            rMember.roles.remove('903144348647055410');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('903144348647055410')
        }
    }
    if (interaction.customId === 'poll') {
        if (rMember.roles.cache.has('937277257989378068')) {
            await interaction.deferUpdate()
            rMember.roles.remove('937277257989378068');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('937277257989378068')
        }
    }
    if (interaction.customId === 'deadc') {
        if (rMember.roles.cache.has('937277290038038559')) {
            await interaction.deferUpdate()
            rMember.roles.remove('937277290038038559');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('937277290038038559')
        }
    }
    if (interaction.customId === 'watcht') {
        if (rMember.roles.cache.has('981444575631646770')) {
            await interaction.deferUpdate()
            rMember.roles.remove('981444575631646770');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('981444575631646770')
        }
    }
    if (interaction.customId === 'event') {
        if (rMember.roles.cache.has('981256277164458045')) {
            await interaction.deferUpdate()
            rMember.roles.remove('981256277164458045');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('981256277164458045')
        }
    }
    if (interaction.customId === 'giveaway') {
        if (rMember.roles.cache.has('981444513493053525')) {
            await interaction.deferUpdate()
            rMember.roles.remove('981444513493053525');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('981444513493053525')
        }
    }
    if (interaction.customId === 'blank') {
            await interaction.deferUpdate()
    }
    
    if (interaction.customId === '1317') {
        if (rMember.roles.cache.has('901408171627778088')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408171627778088');
        } else if(rMember.roles.cache.has('901411803576270878')) {
            interaction.reply({content: `You can only have one age role.`, ephemeral: true})

        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408171627778088')
        }
    }
    if (interaction.customId === '18') {
        if (rMember.roles.cache.has('901411803576270878')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901411803576270878');
        } else if(rMember.roles.cache.has('901408171627778088')) {
            interaction.reply({content: `You can only have one age role.`, ephemeral: true})

        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901411803576270878')
        }
    }
    if (interaction.customId === 'male') {
        if (rMember.roles.cache.has('901408476130050049')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408476130050049');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408476130050049')
        }
    }
    if (interaction.customId === 'female') {
        if (rMember.roles.cache.has('901408508497518664')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408508497518664');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408508497518664')
        }
    }
    if (interaction.customId === 'asia') {
        if (rMember.roles.cache.has('901408545617113088')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408545617113088');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408545617113088')
        }
    }
    if (interaction.customId === 'southamerica') {
        if (rMember.roles.cache.has('901408576650764308')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408576650764308');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408576650764308')
        }
    }
    if (interaction.customId === 'northamerica') {
        if (rMember.roles.cache.has('901408620263116800')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408620263116800');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408620263116800')
        }
    }
    if (interaction.customId === 'africa') {
        if (rMember.roles.cache.has('901408638864850995')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408638864850995');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408638864850995')
        }
    }
    if (interaction.customId === 'australia') {
        if (rMember.roles.cache.has('901408661107277844')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408661107277844');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408661107277844')
        }
    }
    if (interaction.customId === 'europe') {
        if (rMember.roles.cache.has('901408693130768404')) {
            await interaction.deferUpdate()
            rMember.roles.remove('901408693130768404');
        } else {
            await interaction.deferUpdate()
            await interaction.guild.members.cache.get(interaction.user.id).roles.add('901408693130768404')
        }
    }


});