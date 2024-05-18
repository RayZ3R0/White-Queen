const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fillStart = '<a:fillStart:1004299985153699931>'
const fillBar = '<a:fillBar:1004300044347920456>'
const fillEnd = '<a:fillEnd:1004300092628533259>'
const emptyStart = '<:emptyStart:1004300146483404801>'
const emptyBar = '<:emptyBar:1004300236073742356>'
const emptyEnd = '<:emptyEnd:1004300260526522489>'

const randomer = require("randomer.js");
const wait = require('util').promisify(setTimeout);
const sp = require('../../spirits.json')
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')

let inFighting = []

const spiritImages = {
    "Kurumi Tokisaki": "https://c.tenor.com/E6P9PZdh7W0AAAAC/date-a-live-kurumi.gif",
    'Kotori Itsuka': 'https://c.tenor.com/HGrptWks7wYAAAAC/kotor-kotori-itsuka.gif',
    'Miku Izayoi': 'https://c.tenor.com/If7aFNHrWQ4AAAAC/date-a-live-miku-izayoi.gif',
    'Kyouno Natsumi': 'https://c.tenor.com/5AnJ7qdLJM8AAAAd/natsumi-luckey-queen.gif',
    'Nia Honjou': 'https://c.tenor.com/JeVhDCfN7rEAAAAd/date-a-live-nia-honjou.gif',
    'Kaguya Yamai': 'https://c.tenor.com/tTb9YHNtCb4AAAAC/yuzuru-yamai-kaguya-yamai.gif',
    'Yuzuru Yamai': 'https://c.tenor.com/7rzyPBPlkUkAAAAC/date-a-live-yuzuru-yamai.gif',
    'Mukuro Hoshimiya': 'https://c.tenor.com/cTR32VHj5tgAAAAC/date-a-live-dal.gif',
    'Tobiichi Origami': 'https://c.tenor.com/_QXMqWcB5foAAAAd/tobiichi-origami-catty-girlfriend.gif',
    'Himekawa Yoshino': 'https://c.tenor.com/1lllH_v6rXsAAAAC/yoshino-date-a-live-spirit-pledge.gif',
    'Tohka Yatogami': 'https://c.tenor.com/r_uDlLNAUrkAAAAC/yatogami-tohka-date-a-live.gif',
}

const starBuff = {
    '1': 1,
    '2': 1.1,
    '3': 1.2,
    '4': 1.3,
    '5': 1.5
}


const economy = require('discord-bot-eco');

module.exports = {
    name: 'battle',
    aliases: ['bt'],
    description: `Fight with NPCs to gain Spirit Coins.`,
    timeout: 10,
    //  usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        if(!args[0]) return message.reply({content: `Please provide a difficulty level for the battle. The available difficulties are: \`easy\`, \`medium\`, \`hard\``})
        const difficult = args[0].toLowerCase()
        if(!['easy', 'medium', 'hard'].includes(difficult)) return message.reply({content: `Please provide a difficulty level for the battle. The available difficulties are: \`easy\`, \`medium\`, \`hard\``})
        
        let reward;
        if (difficult === 'easy') reward = 25
        else if (difficult === 'medium') reward = 50
        else reward = 75
      
       // if (!enemyuser) return message.reply({ content: `Mention someone to fight.` })
      //  if (enemyuser.id === message.author.id) return message.reply({ content: `You cannot fight yourself, bruh.` })

        function progressBar(value, maxValue, size) {

            let barArray = [];

            let fill = Math.round(size * (value / maxValue > 1 ? 1 : value / maxValue));
            let empty = size - fill > 0 ? size - fill : 0;

            for (let i = 1; i <= fill; i++) barArray.push(fillBar);
            for (let i = 1; i <= empty; i++) barArray.push(emptyBar);

            barArray[0] = barArray[0] == fillBar ? fillStart : emptyStart;
            barArray[barArray.length - 1] = barArray[barArray.length - 1] == fillBar ? fillEnd : emptyEnd;

            return barArray.join(``);
        };
        function randomizer(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (inFighting.includes(message.author.id)) return message.reply({ content: `You are already fighting, please wait for it to finish!` })
        //if (inFighting.includes(enemyuser.id)) return message.reply({ content: `The opponent is already fighting, please wait for them to finish!` })a

        const profileSearch = await profileSchema.findOne({ userid: message.author.id })
        if (profileSearch.selected === `None` || !profileSearch) return message.channel.send({ content: `You do not have a spirit selected. Use the select command to select a spirit for battle.` })
        const energy = profileSearch.energy
        if (energy < 5) return message.reply({content: `You do not have enough energy`})
        const energyUpdate = await profileSchema.findOneAndUpdate({ userid: message.author.id }, { energy: energy - 5 })
        const spiritSearch = await spiritSchema.findOne({ id: profileSearch.selected })
        if (spiritSearch.happiness <= 0) return message.reply({ content: `Your spirit's happiness is 0. Please date your poor spirit before you fight.` })
        let spiritST = sp[spiritSearch.name]
        let spiritStats = {
            "hp": ((spiritST.hp * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "strength": (spiritST.strength * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "defence": (spiritST.defence * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "agility": (spiritST.agility * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "abilities": spiritST.abilities
        }

        let enemyspiritStats = {
            "hp": ((spiritST.hp * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "strength": ((spiritST.strength * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "defence": ((spiritST.defence * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "agility": ((spiritST.agility * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "abilities": spiritST.abilities
        }
        console.log(enemyspiritStats)
        console.log(spiritStats)

        let abilitySpiritStats;
        let abilityEnemyStats;

        var enemyTypes = ["Ellen Mira Mathers", "Isaac Ray Pelham Westcott", "Artemisia Bell Ashcroft"];
        var currentEnemy = randomer.array(enemyTypes);
        var enemyHealth, enemyCurrentHealth;

        var playerHealth = spiritStats.hp
        const maxPlayerh = spiritStats.hp
        var playerhealthatm = spiritStats.hp

        var playerMiss = 0;
        var enemyMiss = 0;

        var rounds = 1;

        let enemymaxHealth;
        
        if (difficult === 'easy') enemymaxHealth = spiritStats.hp - 100
        else if (difficult === 'medium') enemymaxHealth = spiritStats.hp
        else enemymaxHealth = spiritStats.hp + 200

        let playerReiryoku = 0;
        let enemyReiryoku = 0;

        let playerabilityturns = 0;
        let enemyabilityturns = 0;

        let playerAbilityName;
        let enemyAbilityName;

        let enemyName = 'Nibelcol'




        var playerCurrentHealth;

        const sussy = {
            "Ellen Mira Mathers": "https://vignette.wikia.nocookie.net/date-a-live/images/2/2d/Ellen-Dem.png/revision/latest?cb=20150827211500&path-prefix=fr",
            "Isaac Ray Pelham Westcott": "https://th.bing.com/th/id/R.18aa2d91f2e99e23ba2186a0c5a18bbc?rik=2sr2216FW51fqg&pid=ImgRaw&r=0",
            "Artemisia Bell Ashcroft": "https://www.monstersandcritics.com/wp-content/uploads/2019/04/Date-A-Live-Season-4-Artemisia-Bell-Ashcroft.jpg"

        }


        const susEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`${spiritSearch.name} vs ${enemyName}`)
            .setDescription('Starting the fight..')
            .setImage('https://static.wikia.nocookie.net/date-a-live/images/f/ff/Nibelcol_profile_pic.png/revision/latest?cb=20170821031422')
            .setThumbnail(spiritImages[spiritSearch.name])

        const mem = await message.channel.send({ embeds: [susEmbed] })
        inFighting.push(message.author.id)


        function playerAttack() {
            playerReiryoku += 50


            enemyCurrentHealth = enemyHealth;
            const enemyDefence = randomizer((enemyspiritStats.defence / 2), enemyspiritStats.defence)
            const damage = randomizer((spiritStats.strength / 2), spiritStats.strength) - enemyDefence
            enemyHealth = enemyCurrentHealth - damage;

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name}**
            ${progressBar(playerhealthatm, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** attacks **${enemyName}**!\n**${spiritSearch.name}** deals **${damage}** damage to **${enemyName}**`
            ).setFooter({ text: `Round ${rounds}` });
            mem.edit({ embeds: [susEmbed] })
        }

        function enemyAttack(d) {
            enemyReiryoku += 50

            playerCurrentHealth = playerHealth;
            const playerDefence = randomizer((spiritStats.defence / 2), spiritStats.defence)
            const damage = randomizer((d / 2), d) - playerDefence
            playerHealth = playerCurrentHealth - damage;
            playerhealthatm = playerHealth
            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name}**
            ${progressBar(playerhealthatm, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}** attacks **${spiritSearch.name}**!\n**${enemyName}** deals **${damage}** damage to **${spiritSearch.name}**`).setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })
        }
        function playerEvade() {

            playerCurrentHealth = playerHealth;
            const damage = 0
            playerHealth = playerCurrentHealth - damage;
            playerhealthatm = playerHealth
            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name}**
            ${progressBar(playerhealthatm, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}** attacks **${spiritSearch.name}**!\n**${spiritSearch.name}** evaded the attack!`).setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })
        }
        function enemyEvade() {


            enemyCurrentHealth = enemyHealth;
            const damage = 0
            enemyHealth = enemyCurrentHealth - damage;

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name}**
            ${progressBar(playerhealthatm, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** attacks **${enemyName}**!\n**${enemyName}** evaded the attack!`
            ).setFooter({ text: `Round ${rounds}` });
            mem.edit({ embeds: [susEmbed] })
        }


        async function fight(eHealth, eMaxDamage) {
            enemyHealth = eHealth;

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name}**
            ${progressBar(playerhealthatm, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyName}**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, 300, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**`)
                .setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })




            while (playerHealth > 0 && rounds < 26) {
                if (enemyHealth <= 0) {

                    message.channel.send(`**${spiritSearch.name}** wins! You got **${reward}** Spirit Coins as reward.`);
                    //await economy.give(message.author.id, reward, "wallet")
                    const datap = await profileSchema.findOne({
                        userid: message.author.id
                    })
                    await profileSchema.findOneAndUpdate(
                        {
                            userid: message.author.id
                        },
                        {
                            balance: datap.balance + reward
                        }
                    )

                    const idfind = inFighting.find(c => c === message.author.id)
                    await inFighting.splice(inFighting.indexOf(idfind), 1)


                    return;

                }
                else {

                    const pflip = Math.ceil(Math.random() * 100)
                    if (pflip <= enemyspiritStats.agility / 10) playerMiss += 1
                    await wait(4000);
                    if (playerMiss === 0) {
                        playerAttack();
                        playerhealthatm = playerHealth
                    } else {
                        enemyEvade()
                        playerMiss -= 1
                        console.log(playerMiss)
                    }
                    if (enemyHealth <= 0) {
                        rounds = 0
                        message.channel.send(`**${spiritSearch.name}** wins!  You got **${reward}** Spirit Coins as reward.`);
                        //await economy.give(message.author.id, reward, "wallet")
                        const datap = await profileSchema.findOne({
                            userid: message.author.id
                        })
                        await profileSchema.findOneAndUpdate(
                            {
                                userid: message.author.id
                            },
                            {
                                balance: datap.balance + reward
                            }
                        )

                        const idfinda = inFighting.find(c => c === message.author.id)
                        await inFighting.splice(inFighting.indexOf(idfinda), 1)


                        return;
                    }
                    const eflip = Math.ceil(Math.random() * 100)
                    if (eflip <= spiritStats.agility / 10) enemyMiss += 1
                    await wait(4000);
                    if (enemyMiss < 1) {
                        enemyAttack(eMaxDamage);
                        playerhealthatm = playerHealth
                    } else {
                        playerEvade()
                        enemyMiss -= 1
                        console.log(enemyMiss)
                    }


                    rounds += 1
                }
            }
            rounds = 0
            message.channel.send(`**${enemyName}** wins!`)
            const idfind = inFighting.find(c => c === message.author.id)
            await inFighting.splice(inFighting.indexOf(idfind), 1)
        }

        /*switch (currentEnemy) {

            // health, maxdamage

            case "Ellen Mira Mathers":
                fight(300, 50);
                break;

            case "Isaac Ray Pelham Westcott":
                fight(300, 100);
                break;

            case "Artemisia Bell Ashcroft":
                fight(300, 30);
                break;
        }*/

        fight((enemymaxHealth), enemyspiritStats.strength)




    },
};