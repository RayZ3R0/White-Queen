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
    "Kurumi Tokisaki": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/dd6qntw-cb907137-703b-49ad-adf7-9c07e53048e7.png/v1/fill/w_893,h_895,strp/kurumi_tokisaki_by_reinelumiere_dd6qntw-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4NCIsInBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGQ2cW50dy1jYjkwNzEzNy03MDNiLTQ5YWQtYWRmNy05YzA3ZTUzMDQ4ZTcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.abTmO5xH4folUG9hph-MacfYi5EvE4TxgToQ-v6ruos",
    'Kotori Itsuka': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/ddcv9jn-63d4d9fd-10bd-460b-822d-8d6dc240edac.png/v1/fill/w_819,h_975,strp/kotori_itsuka_by_reinelumiere_ddcv9jn-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjU2MCIsInBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGRjdjlqbi02M2Q0ZDlmZC0xMGJkLTQ2MGItODIyZC04ZDZkYzI0MGVkYWMucG5nIiwid2lkdGgiOiI8PTIxNTAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.MmRo_HxSpl5laseNHgOLnY1PGmyCztM59mttnEGO_UE',
    'Miku Izayoi': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/df363k1-34bac577-c6e2-4775-96e6-b21240d2e075.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGYzNjNrMS0zNGJhYzU3Ny1jNmUyLTQ3NzUtOTZlNi1iMjEyNDBkMmUwNzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-wTJB1KJ60-dUXMnq7BClQadhSlYCAx6Qmbbq1ph9xk',
    'Kyouno Natsumi': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/dd6t44s-7d5e10cb-8af4-49a8-b735-9c804714039b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGQ2dDQ0cy03ZDVlMTBjYi04YWY0LTQ5YTgtYjczNS05YzgwNDcxNDAzOWIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HJNkkei6qTjPrdXgER64a5SsEniCCKacZESooUxw2Qg',
    'Nia Honjou': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/ddxoprm-ffcb6548-a02b-4efd-8b6b-38b21eb08934.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGR4b3BybS1mZmNiNjU0OC1hMDJiLTRlZmQtOGI2Yi0zOGIyMWViMDg5MzQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NFU3pi-f36POyT3aEryIRMwSmEvI6fXZ0NYKdOH-_C8',
    'Kaguya Yamai': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/df363f8-b1a3b00b-6528-49ee-9829-f564bab9120d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGYzNjNmOC1iMWEzYjAwYi02NTI4LTQ5ZWUtOTgyOS1mNTY0YmFiOTEyMGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rxE0v2web4vgF-hM4AwOyInfnuPZLYy9zVAaGAcXE3w',
    'Yuzuru Yamai': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/df363cx-7095bd31-daff-4f56-879a-d7e10c6eac21.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGYzNjNjeC03MDk1YmQzMS1kYWZmLTRmNTYtODc5YS1kN2UxMGM2ZWFjMjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IcVBefL0kSHnM2j1SOxkzIQ23TgmgllfeWBNdgzThMk',
    'Mukuro Hoshimiya': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/ddl1k1n-68aaf824-c291-475a-85f3-c18338591bc0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGRsMWsxbi02OGFhZjgyNC1jMjkxLTQ3NWEtODVmMy1jMTgzMzg1OTFiYzAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.32hoFOlSHeeEwVTYOJXilp8vYm5-jVN7wN11c_JmQ7M',
    'Tobiichi Origami': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/ddkhcdu-278571da-563c-4e8e-8be9-f6f998304a1b.png/v1/fill/w_826,h_968,strp/origami_tobiichi_by_reinelumiere_ddkhcdu-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ4NiIsInBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGRraGNkdS0yNzg1NzFkYS01NjNjLTRlOGUtOGJlOS1mNmY5OTgzMDRhMWIucG5nIiwid2lkdGgiOiI8PTEyNjgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.g-e13NOwOcQ3ddpsnxlMbqI4mkxFmkOFE_WqtdYqAO4',
    'Himekawa Yoshino': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/df363i6-f1362580-e94d-4f7e-b468-ed258c18578c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGYzNjNpNi1mMTM2MjU4MC1lOTRkLTRmN2UtYjQ2OC1lZDI1OGMxODU3OGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XhU6AhBuNGBWpXR9V6WAO4Z4qnpZuNa30Bqm0m4fVDc',
    'Tohka Yatogami': 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5062197-3393-4855-978a-533d60157223/ddcv9h9-ed7b2254-c8f5-4192-b5d2-19608e9fac2d.png/v1/fill/w_1280,h_1831,strp/tohka_yatogami_by_reinelumiere_ddcv9h9-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgzMSIsInBhdGgiOiJcL2ZcL2Y1MDYyMTk3LTMzOTMtNDg1NS05NzhhLTUzM2Q2MDE1NzIyM1wvZGRjdjloOS1lZDdiMjI1NC1jOGY1LTQxOTItYjVkMi0xOTYwOGU5ZmFjMmQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6TJt7djvfSVNSFgh_dkgvIrmVcgibHH7S8_q-1I8b6I',
}


const starBuff = {
    '1': 1,
    '2': 1.1,
    '3': 1.2,
    '4': 1.3,
    '5': 1.5
}

module.exports = {
    name: 'fight',
    aliases: ['duel'],
    description: 'Tatakae!',
    timeout: 10,
    //  usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const enemyuser = message.mentions.members.first().user ||
            message.guild.members.cache.get(args[0]).user

        if (!enemyuser) return message.reply({ content: `Mention someone to fight.` })
        if (enemyuser.id === message.author.id) return message.reply({ content: `You cannot fight yourself, bruh.` })
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

        const profileSearch = await profileSchema.findOne({ userid: message.author.id })
        if (!profileSearch) return message.channel.send({ content: `You do not have a spirit selected. Use the select command to select a spirit for battle.` })
        const spiritSearch = await spiritSchema.findOne({ id: profileSearch.selected })
        if (spiritSearch.happiness <= 30) return message.reply({ content: `Your spirit's happiness is less than 30. Please date your poor spirit before you fight.` })
        let spiritST = sp[spiritSearch.name]
        let spiritStats = {
            "hp": ((spiritST.hp * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`]),
            "strength": (spiritST.strength * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "defence": (spiritST.defence * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "agility": (spiritST.agility * spiritSearch.happiness / 100) * starBuff[`${spiritSearch.stars}`],
            "abilities": spiritST.abilities
        }

        const enemyprofileSearch = await profileSchema.findOne({ userid: enemyuser.id })
        if (!enemyprofileSearch || enemyprofileSearch.selected === `None`) return message.channel.send({ content: `The opponent does not have a spirit selected.` })
        const enemyspiritSearch = await spiritSchema.findOne({ id: enemyprofileSearch.selected })
        if (enemyspiritSearch.happiness <= 30) return message.reply({ content: `The enemy's spirit's happiness is 30. Please date the poor spirit before fighting.` })
        const enemyspiritST = sp[enemyspiritSearch.name]
        let enemyspiritStats = {
            "hp": ((enemyspiritST.hp * enemyspiritSearch.happiness / 100) * starBuff[`${enemyspiritSearch.stars}`]),
            "strength": (enemyspiritST.strength * enemyspiritSearch.happiness / 100) * starBuff[`${enemyspiritSearch.stars}`],
            "defence": (enemyspiritST.defence * enemyspiritSearch.happiness / 100) * starBuff[`${enemyspiritSearch.stars}`],
            "agility": (enemyspiritST.agility * enemyspiritSearch.happiness / 100) * starBuff[`${enemyspiritSearch.stars}`],
            "abilities": enemyspiritST.abilities
        }

        let pAbilityArray = spiritStats.abilities
        let eAbilityArray = enemyspiritStats.abilities


        var enemyTypes = ["Ellen Mira Mathers", "Isaac Ray Pelham Westcott", "Artemisia Bell Ashcroft"];
        var currentEnemy = randomer.array(enemyTypes);
        var enemyHealth, enemyCurrentHealth;

        var playerHealth = spiritStats.hp
        const maxPlayerh = spiritStats.hp
        var playerhealthatm = spiritStats.hp

        var playerMiss = 0;
        var enemyMiss = 0;

        var rounds = 1;

        const enemymaxHealth = enemyspiritStats.hp

        let playerReiryoku = 0;
        let enemyReiryoku = 0;

        let playerabilityturns = 0;
        let enemyabilityturns = 0;

        let extraplayerdamage = {
            "damage": 0,
            "reason": `None`,
        };
        let extraenemydamage = {
            "damage": 0,
            "reason": `None`,
        };
        let playerSeraphim = {
            "defence": 1,
            "reason": `None`,
        };
        let enemySeraphim = {
            "defence": 1,
            "reason": `None`,
        };
        let playerKanaph = {
            "defence": 1,
            "reason": `None`,
        };
        let enemyKanaph = {
            "defence": 1,
            "reason": `None`,
        };
        let extraplayerdamage2 = {
            "damage": 0,
            "reason": `None`,
        };
        let extraenemydamage2 = {
            "damage": 0,
            "reason": `None`,
        };

        let pSelfDamage = {
            "sDamage": 0,
            "aDamage": 1,
            "reason": `None`
        }

        let eSelfDamage = {
            "sDamage": 0,
            "aDamage": 1,
            "reason": `None`
        }



        let enemySolot = 2
        let playerSolot = 2

        let playerAbilityName;
        let enemyAbilityName;

        let pabilityturn = 0
        let eabilityturn = 0

        let pdefenceturn = 0
        let edefenceturn = 0
        
        let pdefenceturn2 = 0
        let edefenceturn2 = 0

        let playerSureHit = 0;
        let enemySureHit = 0;



        let abilitySpiritStats;
        let abilityEnemyStats;




        var playerCurrentHealth;

        const sussy = {
            "Ellen Mira Mathers": "https://vignette.wikia.nocookie.net/date-a-live/images/2/2d/Ellen-Dem.png/revision/latest?cb=20150827211500&path-prefix=fr",
            "Isaac Ray Pelham Westcott": "https://th.bing.com/th/id/R.18aa2d91f2e99e23ba2186a0c5a18bbc?rik=2sr2216FW51fqg&pid=ImgRaw&r=0",
            "Artemisia Bell Ashcroft": "https://www.monstersandcritics.com/wp-content/uploads/2019/04/Date-A-Live-Season-4-Artemisia-Bell-Ashcroft.jpg"

        }


        const susEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`${spiritSearch.name} vs ${enemyspiritSearch.name}`)
            .setDescription('Starting the fight..')
            .setImage(spiritImages[enemyspiritSearch.name])
            .setThumbnail(spiritImages[spiritSearch.name])

        const mem = await message.channel.send({ embeds: [susEmbed] })
        inFighting.push(message.author.id)

        inFighting.push(enemyuser.id)


        function playerAttack() {
            playerReiryoku += 25


            enemyCurrentHealth = enemyHealth;
            const enemyDefence = Math.floor(randomizer((enemyspiritStats.defence / 2), enemyspiritStats.defence) * enemySeraphim.defence * playerKanaph.defence)
            const damage = randomizer((spiritStats.strength / 2), spiritStats.strength) - enemyDefence
            enemyHealth = enemyCurrentHealth - ((damage + extraenemydamage2.damage) * pSelfDamage.aDamage) - extraenemydamage.damage;


            playerCurrentHealth = playerHealth;
            playerHealth = playerCurrentHealth - (damage * pSelfDamage.sDamage);
            playerhealthatm = playerHealth


            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** attacks **${enemyspiritSearch.name}**!\n**${spiritSearch.name}** deals **${damage}** damage to **${enemyspiritSearch.name}**
            ${extraenemydamage.reason === `None` ? `` : extraenemydamage.reason}${extraenemydamage2.reason === `None` ? `` : extraenemydamage2.reason}${pSelfDamage.reason === `None` ? `` : pSelfDamage.reason}${enemySeraphim.reason === `None` ? `` : enemySeraphim.reason}${playerKanaph.reason === `None` ? `` : playerKanaph.reason}
            `
            ).setFooter({ text: `Round ${rounds}` });
            mem.edit({ embeds: [susEmbed] })
        }
        function pZayin() {

            enemyCurrentHealth = enemyHealth;
            const damage = randomizer((spiritStats.strength / 2), spiritStats.strength)
            enemyHealth = enemyCurrentHealth - ((damage + extraenemydamage2.damage) * pSelfDamage.aDamage) - extraenemydamage.damage;


            playerCurrentHealth = playerHealth;
            playerHealth = playerCurrentHealth - (damage * pSelfDamage.sDamage);
            playerhealthatm = playerHealth



            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **Zayin!**\n**${spiritSearch.name}** attacks **${enemyspiritSearch.name}**!\n**${spiritSearch.name}** deals **${damage}** damage to **${enemyspiritSearch.name}**.\nEnemy unable to defend or evade due to the effects of **Zayin**
            ${extraenemydamage.reason === `None` ? `` : extraenemydamage.reason}${extraenemydamage2.reason === `None` ? `` : extraenemydamage2.reason}${pSelfDamage.reason === `None` ? `` : pSelfDamage.reason}`
            ).setFooter({ text: `Round ${rounds}` });
            mem.edit({ embeds: [susEmbed] })
            enemyabilityturns = 0
        }

        function enemyAttack(d) {
            enemyReiryoku += 25

            playerCurrentHealth = playerHealth;
            const playerDefence = Math.floor(randomizer((spiritStats.defence / 2), spiritStats.defence) * playerSeraphim.defence * enemyKanaph.defence)
            const damage = (randomizer((d / 2), d) - playerDefence)
            playerHealth = playerCurrentHealth - ((damage + extraplayerdamage2.damage) * eSelfDamage.aDamage) - extraplayerdamage.damage;
            playerhealthatm = playerHealth

            enemyCurrentHealth = enemyHealth;
            enemyHealth = enemyCurrentHealth - (damage * eSelfDamage.sDamage);



            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** attacks **${spiritSearch.name}**!\n**${enemyspiritSearch.name}** deals **${damage}** damage to **${spiritSearch.name}**
            ${extraplayerdamage.reason === `None` ? `` : extraplayerdamage.reason}${extraplayerdamage2.reason === `None` ? `` : extraplayerdamage2.reason}${eSelfDamage.reason === `None` ? `` : eSelfDamage.reason}${playerSeraphim.reason === `None` ? `` : playerSeraphim.reason}${enemyKanaph.reason === `None` ? `` : enemyKanaph.reason}
            `)
                .setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })
        }
        function eZayin() {
            const d = enemyspiritStats.strength

            playerCurrentHealth = playerHealth;
            const damage = randomizer((d / 2), d)
            playerHealth = playerCurrentHealth - ((damage + extraplayerdamage2.damage) * eSelfDamage.aDamage) - extraplayerdamage.damage;
            playerhealthatm = playerHealth


            enemyCurrentHealth = enemyHealth;
            enemyHealth = enemyCurrentHealth - (damage * eSelfDamage.sDamage);

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **Zayin!**.\n**${enemyspiritSearch.name}** attacks **${spiritSearch.name}**!\n**${enemyspiritSearch.name}** deals **${damage}** damage to **${spiritSearch.name}**\nEnemy unable to defend or evade due to the effects of **Zayin**
            ${extraplayerdamage.reason === `None` ? `` : extraplayerdamage.reason}${extraplayerdamage2.reason === `None` ? `` : extraplayerdamage2.reason}${eSelfDamage.reason === `None` ? `` : eSelfDamage.reason}
            `)
                .setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })
            enemyabilityturns = 0
        }
        function playerEvade() {

            playerCurrentHealth = playerHealth;
            const damage = 0 + extraplayerdamage.damage
            playerHealth = playerCurrentHealth - damage;
            playerhealthatm = playerHealth
            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** attacks **${spiritSearch.name}**!\n**${spiritSearch.name}** evaded the attack!
            ${extraplayerdamage.reason === `None` ? `` : extraplayerdamage.reason}
            `)
                .setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })
        }
        function enemyEvade() {


            enemyCurrentHealth = enemyHealth;
            const damage = 0 + extraenemydamage.damage
            enemyHealth = enemyCurrentHealth - damage;

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** attacks **${enemyspiritSearch.name}**!\n**${enemyspiritSearch.name}** evaded the attack!
            ${extraenemydamage.reason === `None` ? `` : extraenemydamage.reason}
            `
            ).setFooter({ text: `Round ${rounds}` });
            mem.edit({ embeds: [susEmbed] })
        }
        async function playerAbility() {

            playerReiryoku -= 100;

            if (playerAbilityName === "Zayin") {
                playerabilityturns += 1
            }
            if (playerAbilityName === "Halvanhelev") {


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${spiritSearch.name}**'s strength goes up by **200**`
                ).setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })

                spiritStats = {
                    "hp": spiritStats.hp,
                    "strength": spiritStats.strength + 100,
                    "defence": spiritStats.defence,
                    "agility": spiritStats.agility,
                    "abilities": spiritStats.abilities
                }


            }
            if (playerAbilityName === "Ratebilish") {
                const boosta = 100


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${spiritSearch.name}** boosts her defence and agility each, by **${boosta}**`
                ).setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })

                spiritStats = {
                    "hp": spiritStats.hp,
                    "strength": spiritStats.strength,
                    "defence": spiritStats.defence + boosta,
                    "agility": spiritStats.agility + boosta,
                    "abilities": spiritStats.abilities
                }


            }
            if (playerAbilityName === "Frozen World") {


                const dama = extraenemydamage.damage + 100
                extraenemydamage = {
                    "damage": dama,
                    "reason": `**${enemyspiritSearch.name}** received **${dama}** damage due to ability **Frozen World**\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\nThe surrounding area was frozen and the opponent will receive **${dama}** damage every turn!`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Dalet") {
                const hpadd = spiritStats.hp * 0.2
                playerHealth = (playerHealth + hpadd) > spiritStats.hp ? spiritStats.hp : playerHealth + hpadd
                playerhealthatm = (playerhealthatm + hpadd) > spiritStats.hp ? spiritStats.hp : playerhealthatm + hpadd


                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Fantasia") {
                const hpadd = spiritStats.hp * 0.2
                playerHealth = (playerHealth + hpadd) > spiritStats.hp ? spiritStats.hp : playerHealth + hpadd
                playerhealthatm = (playerhealthatm + hpadd) > spiritStats.hp ? spiritStats.hp : playerhealthatm + hpadd




                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Solo") {
                let changeA = 0.15
                if (playerSolot <= 1) {
                    
                    const abFind = pAbilityArray.find(c => c === "Solo")
                    await pAbilityArray.splice(pAbilityArray.indexOf(abfind), 1)
                }
                playerSolot -= 1
                const adama = eSelfDamage.aDamage - changeA
                const sdama = eSelfDamage.sDamage + changeA
                eSelfDamage = {
                    "sDamage": sdama,
                    "aDamage": adama,
                    "reason": `**${enemyspiritSearch.name}** deals **${adama * 100}%** of its damage to the opponent and **${sdama * 100}%** to themselves due to the effects of **Solo**\n`
                }


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${enemyspiritSearch.name}** will deal **${adama * 100}%** of its damage to the opponent and **${sdama * 100}** to themselves.`
                ).setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }

            if (playerAbilityName === "Kaleidoscope") {


                if (enemyHealth > playerhealthatm) {

                    enemyCurrentHealth = enemyHealth;
                    enemyHealth = enemyCurrentHealth;
                    const hpadd = Math.floor(enemyHealth - playerhealthatm)
                    playerHealth = enemyHealth > spiritStats.hp ? spiritStats.hp : enemyHealth
                    playerhealthatm = enemyHealth > spiritStats.hp ? spiritStats.hp : enemyHealth




                    susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}** copies the opponent's HP and regenerates **${hpadd}** health.`)
                        .setFooter({ text: `Round ${rounds}` });
                    mem.edit({ embeds: [susEmbed] })
                } else {
                    const attacboost = Math.floor(enemyspiritStats.strength * 0.2)
                    const defboost = Math.floor(enemyspiritStats.defence * 0.2)
                    const agilityboost = Math.floor(enemyspiritStats.agility * 0.2)
                    const amessage = `**${spiritSearch.name}** copies **20%** the opponent's current stats and boosts her own strength, defense and agility!`


                    enemyCurrentHealth = enemyHealth;
                    enemyHealth = enemyCurrentHealth;

                    spiritStats = {
                        "hp": spiritStats.hp,
                        "strength": spiritStats.strength + attacboost,
                        "defence": spiritStats.defence + defboost,
                        "agility": spiritStats.agility + agilityboost,
                        "abilities": spiritStats.abilities
                    }

                    susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**
            ${amessage}`
                    ).setFooter({ text: `Round ${rounds}` });
                    mem.edit({ embeds: [susEmbed] })

                }
            }
            if (playerAbilityName === "Heal") {
                const hpadd = spiritStats.hp * 0.2
                playerHealth = (playerHealth + hpadd) > spiritStats.hp ? spiritStats.hp : playerHealth + hpadd
                playerhealthatm = (playerhealthatm + hpadd) > spiritStats.hp ? spiritStats.hp : playerhealthatm + hpadd




                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })
            }
            if (playerAbilityName === "Precognition") {



                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                enemyMiss += 1

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}** predicts the future and will evade the opponent's attack.`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Megiddo") {
                pabilityturn += 3;


                const dama = extraenemydamage2.damage + 150
                extraenemydamage2 = {
                    "damage": dama,
                    "reason": `**${enemyspiritSearch.name}** received **${dama}** extra damage due to boosted strength of **Megiddo**\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${spiritSearch.name}** changes her angel into a flame powered cannon which significantly boosts her damage by **${dama}** for the next **2 turns.**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Heated Regeration") {
                const hpadd = spiritStats.hp * 0.2
                playerHealth = (playerHealth + hpadd) > spiritStats.hp ? spiritStats.hp : playerHealth + hpadd
                playerhealthatm = (playerhealthatm + hpadd) > spiritStats.hp ? spiritStats.hp : playerhealthatm + hpadd




                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n **${spiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Artelif") {
                pabilityturn += 2;


                const dama = extraenemydamage2.damage + 200
                extraenemydamage2 = {
                    "damage": dama,
                    "reason": `**${enemyspiritSearch.name}** received **${dama}** extra damage due to boosted strength of **Artelif** and a surefire hit.\n`,
                };
                playerSureHit += 2;


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**By making all of the pillars take on a circular formation and pointing their tips in the same direction, **${spiritSearch.name}** can shoot out a beam of pure shining light with a **100%** hit chance.`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Seraphim") {
                pdefenceturn += 6;


                const def = playerSeraphim.defence + 0.15
                playerSeraphim = {
                    "defence": def,
                    "reason": `**${spiritSearch.name}**'s boosted defence weakened the attack by **${def * 100}%**\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\nBy making the pillars surround her, **${spiritSearch.name}** uses her gleaming light to create a barrier that can block incoming attacks. The next **5** incoming attacks are weakened by **15%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "El Re'em") {
                pdefenceturn2 += 2;


                //const def = enemyKanaph.defence + 0.15
                playerKanaph = {
                    "defence": 0,
                    "reason": `**${spiritSearch.name}** uses **El Re'em**, a piercing unblockable attack!\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            
            if (playerAbilityName === "El Kanaph") {
                pdefenceturn2 += 4;

                playerKanaph = {
                    "defence": 0,
                    "reason": `**${spiritSearch.name}**'s attacks are unblockable due to **El Kanaph**!\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!** **${spiritSearch.name}**'s next **3** attacks will be undefendable!`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (playerAbilityName === "Shifuru") {


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${spiritSearch.name}**'s strength goes up by **100**`
                ).setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })

                spiritStats = {
                    "hp": spiritStats.hp,
                    "strength": spiritStats.strength + 100,
                    "defence": spiritStats.defence,
                    "agility": spiritStats.agility,
                    "abilities": spiritStats.abilities
                }


            }
            if (playerAbilityName === "Lataib") {
                pabilityturn += 2;


                const dama = extraenemydamage2.damage + 200
                extraenemydamage2 = {
                    "damage": dama,
                    "reason": `**${enemyspiritSearch.name}** received **${dama}** extra damage due to the meteors.\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${spiritSearch.name}** activates ability, **${playerAbilityName}!**\n**${spiritSearch.name}** opens up a wormhole that fires a meteorite at the opponent.`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
        }
        async function enemyAbility() {

            enemyReiryoku -= 100
            if (enemyAbilityName === "Zayin") {
                enemyabilityturns += 2
            }
            if (enemyAbilityName === "Halvanhelev") {

                enemyspiritStats = {
                    "hp": enemyspiritStats.hp,
                    "strength": enemyspiritStats.strength + 100,
                    "defence": enemyspiritStats.defence,
                    "agility": enemyspiritStats.agility,
                    "abilities": enemyspiritStats.abilities
                }


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}**'s strength goes up by **200**`).setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }
            if (enemyAbilityName === "Ratebilish") {
                const boosta = 100

                enemyspiritStats = {
                    "hp": enemyspiritStats.hp,
                    "strength": enemyspiritStats.strength,
                    "defence": enemyspiritStats.defence + boosta,
                    "agility": enemyspiritStats.agility + boosta,
                    "abilities": enemyspiritStats.abilities
                }


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}** boosts her defence and agility each, by **${boosta}**`).setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }

            if (enemyAbilityName === "Frozen World") {
                const dama = extraplayerdamage.damage + 100
                extraplayerdamage = {
                    "damage": dama,
                    "reason": `**${spiritSearch.name}** received **${dama}** damage due to ability **Frozen World**\n`,
                };


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\nThe surrounding area was frozen and the opponent will receive **${dama}** damage every turn!`)
                    .setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }
            if (enemyAbilityName === "Dalet") {


                const hpadd = enemyspiritStats.hp * 0.2
                enemyHealth = (enemyHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyHealth + hpadd
                enemyCurrentHealth = (enemyCurrentHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyCurrentHealth + hpadd



                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n **${enemyspiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "Fantasia") {


                const hpadd = enemyspiritStats.hp * 0.2
                enemyHealth = (enemyHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyHealth + hpadd
                enemyCurrentHealth = (enemyCurrentHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyCurrentHealth + hpadd



                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n **${enemyspiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "Solo") {
                let changeA = 0.15
                if (enemySolot <= 1) {
                    
                    const abFind = eAbilityArray.find(c => c === "Solo")
                    await eAbilityArray.splice(pAbilityArray.indexOf(abfind), 1)
                }
                enemySolot -= 1
                const adama = pSelfDamage.aDamage - changeA
                const sdama = pSelfDamage.sDamage + changeA
                pSelfDamage = {
                    "sDamage": sdama,
                    "aDamage": adama,
                    "reason": `**${spiritSearch.name}** deals **${adama * 100}%** of its damage to the opponent and **${sdama * 100}%** to themselves due to the effects of **Solo**\n`
                }


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${spiritSearch.name}** will deal **${adama * 100}%** of its damage to the opponent and **${sdama * 100}%** to themselves.`)
                    .setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }
            if (enemyAbilityName === "Kaleidoscope") {
                const hptest = playerhealthatm - enemyHealth

                if (playerhealthatm > enemyHealth) {

                    const hpadd = Math.floor(playerhealthatm - enemyHealth)
                    enemyHealth = playerhealthatm > enemyspiritStats.hp ? enemyspiritStats.hp : playerhealthatm
                    enemyCurrentHealth = playerhealthatm > enemyspiritStats.hp ? enemyspiritStats.hp : playerhealthatm




                    susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}** copies the opponent's HP and regenerates **${hpadd}** health.`)
                        .setFooter({ text: `Round ${rounds}` });
                    mem.edit({ embeds: [susEmbed] })
                } else {
                    const attacboost = Math.floor(spiritStats.strength * 0.2)
                    const defboost = Math.floor(spiritStats.defence * 0.2)
                    const agilityboost = Math.floor(spiritStats.agility * 0.2)
                    const amessage = `**${enemyspiritSearch.name}** copies **20%** the opponent's current stats and boosts her own strength, defense and agility!`


                    enemyCurrentHealth = enemyHealth;
                    enemyHealth = enemyCurrentHealth;

                    enemyspiritStats = {
                        "hp": enemyspiritStats.hp,
                        "strength": enemyspiritStats.strength + attacboost,
                        "defence": enemyspiritStats.defence + defboost,
                        "agility": enemyspiritStats.agility + agilityboost,
                        "abilities": enemyspiritStats.abilities
                    }

                    susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**
            ${amessage}`
                    ).setFooter({ text: `Round ${rounds}` });
                    mem.edit({ embeds: [susEmbed] })

                }
            }
            if (enemyAbilityName === "Heal") {


                const hpadd = enemyspiritStats.hp * 0.2
                enemyHealth = (enemyHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyHealth + hpadd
                enemyCurrentHealth = (enemyCurrentHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyCurrentHealth + hpadd



                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n **${enemyspiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "Precognition") {


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth

                playerMiss += 1


                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n **${enemyspiritSearch.name}** predicts the future and will evade the opponent's attack.`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "Megiddo") {

                eabilityturn += 3;
                const dama = extraplayerdamage2.damage + 150
                extraplayerdamage2 = {
                    "damage": dama,
                    "reason": `**${spiritSearch.name}** received **${dama}** extra damage due to boosted strength of **Megiddo**\n`,
                };


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}** changes her angel into a flame powered cannon which significantly boosts her damage by **${dama}** for the next **2 turns.**`)
                    .setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }
            if (enemyAbilityName === "Heated Regeneration") {


                const hpadd = enemyspiritStats.hp * 0.2
                enemyHealth = (enemyHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyHealth + hpadd
                enemyCurrentHealth = (enemyCurrentHealth + hpadd) > enemyspiritStats.hp ? enemyspiritStats.hp : enemyCurrentHealth + hpadd



                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n **${enemyspiritSearch.name}**'s health was restored by **20%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "Artelif") {

                eabilityturn += 2;
                const dama = extraplayerdamage2.damage + 200
                extraplayerdamage2 = {
                    "damage": dama,
                    "reason": `**${spiritSearch.name}** received **${dama}** extra damage due to boosted strength of **Artelif** and a surefire hit.\n`,
                };
                enemySureHit += 2;


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\nBy making all of the pillars take on a circular formation and pointing their tips in the same direction, **${enemyspiritSearch.name}** can shoot out a beam of pure shining light with a **100%** hit chance.`)
                    .setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })
            }
            if (enemyAbilityName === "Seraphim") {
                edefenceturn += 6;


                const def = enemySeraphim.defence + 0.15
                enemySeraphim = {
                    "defence": def,
                    "reason": `**${enemyspiritSearch.name}**'s boosted defence weakened the attack by **${def * 100}%**\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\nBy making the pillars surround her, **${enemyspiritSearch.name}** uses her gleaming light to create a barrier that can block incoming attacks. The next **5** incoming attacks are weakened by **15%**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            if (enemyAbilityName === "El Re'em") {
                edefenceturn2 += 2;


                //const def = enemyKanaph.defence + 0.15
                enemyKanaph = {
                    "defence": 0,
                    "reason": `**${enemyspiritSearch.name}** uses **El Re'em**, a piercing unblockable attack!\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })



            }
            
            if (playerAbilityName === "El Kanaph") {
                edefenceturn2 += 4;

                enemyKanaph = {
                    "defence": 0,
                    "reason": `**${enemyspiritSearch.name}**'s attacks are unblockable due to **El Kanaph**!\n`,
                };


                enemyCurrentHealth = enemyHealth;
                enemyHealth = enemyCurrentHealth;

                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!** **${enemyspiritSearch.name}**'s next **3** attacks will be undefendable!`)
                    .setFooter({ text: `Round ${rounds}` });
                mem.edit({ embeds: [susEmbed] })
            }
            if (enemyAbilityName === "Shifuru") {

                enemyspiritStats = {
                    "hp": enemyspiritStats.hp,
                    "strength": enemyspiritStats.strength + 100,
                    "defence": enemyspiritStats.defence,
                    "agility": enemyspiritStats.agility,
                    "abilities": enemyspiritStats.abilities
                }


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}**'s strength goes up by **100**`).setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })


            }
            if (enemyAbilityName === "Lataib") {

                eabilityturn += 2;
                const dama = extraplayerdamage2.damage + 200
                extraplayerdamage2 = {
                    "damage": dama,
                    "reason": `**${spiritSearch.name}** received **${dama}** extra damage due to the meteors.\n`,
                };


                playerCurrentHealth = playerHealth;
                playerhealthatm = playerHealth
                susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyspiritSearch.name}** activates ability, **${enemyAbilityName}!**\n**${enemyspiritSearch.name}** opens up a wormhole that fires a meteorite at the opponent.`)
                    .setFooter({ text: `Round ${rounds}` })
                mem.edit({ embeds: [susEmbed] })
            }


        }
        async function playerAbilityAttack(enemyHealth) {
            if (playerAbilityName === "Zayin") {
                pZayin()
                if (enemyHealth <= 0) {
                    rounds = 0
                    message.channel.send(`**${spiritSearch.name} wins!**`);

                    const idfind = inFighting.find(c => c === message.author.id)
                    await inFighting.splice(inFighting.indexOf(idfind), 1)
                    const idfinda = inFighting.find(c => c === enemyuser.id)
                    await inFighting.splice(inFighting.indexOf(idfinda), 1)


                    return;
                }

            }

            if (playerabilityturns > 0) playerabilityturns -= 1
        }
        async function enemyAbilityAttack(enemyHealth) {
            if (enemyAbilityName === "Zayin") {
                eZayin()

            }

            if (enemyabilityturns > 0) enemyabilityturns -= 1
        }
        async function fight(eHealth, eMaxDamage) {
            enemyHealth = eHealth;

            susEmbed.setDescription(`
            **${message.author.username}'s ${spiritSearch.name} 【${'<a:starSpin:1006138461234937887>'.repeat(spiritSearch.stars)}】**
            ${progressBar(playerhealthatm >= 0 ? playerhealthatm : 0, maxPlayerh, 10)} **[${playerhealthatm < 0 ? 0 : Math.floor(playerhealthatm)}/${Math.floor(maxPlayerh)}] ♥**
            ${progressBar(playerReiryoku, 100, 10)} **[${playerReiryoku < 0 ? 0 : playerReiryoku}/100] <a:PurpleFire:1005722787144540361>**

            **${enemyuser.username}'s ${enemyspiritSearch.name}【${'<a:starSpin:1006138461234937887>'.repeat(enemyspiritSearch.stars)}】**
            ${progressBar(enemyHealth < 0 ? 0 : enemyHealth, enemymaxHealth, 10)} **[${enemyHealth < 0 ? 0 : Math.floor(enemyHealth)}/${Math.floor(enemymaxHealth)}] ♥**
            ${progressBar(enemyReiryoku, 100, 10)} **[${enemyReiryoku < 0 ? 0 : enemyReiryoku}/100] <a:PurpleFire:1005722787144540361>**`)
                .setFooter({ text: `Round ${rounds}` })
            mem.edit({ embeds: [susEmbed] })

            while (playerHealth > 0 && rounds < 26) {
                if (playerSureHit > 0 && enemyHealth >= 0) {
                    playerSureHit -= 1
                }
                if (enemySureHit > 0 && enemyHealth >= 0) {
                    enemySureHit -= 1
                }
                if (pabilityturn > 0 && enemyHealth >= 0) {
                    pabilityturn -= 1;
                    console.log(pabilityturn, extraenemydamage2)
                }
                if (pabilityturn == 0 && enemyHealth >= 0) {
                    extraenemydamage2 = {
                        "damage": 0,
                        "reason": `None`,
                    };
                    console.log(pabilityturn, extraenemydamage2)
                }
                if (eabilityturn > 0 && enemyHealth >= 0) {
                    eabilityturn -= 1;
                    console.log(eabilityturn, extraplayerdamage2)
                }
                if (eabilityturn == 0 && enemyHealth >= 0) {
                    extraplayerdamage2 = {
                        "damage": 0,
                        "reason": `None`,
                    };
                    console.log(eabilityturn, extraplayerdamage2)
                }

                if (pdefenceturn > 0 && enemyHealth >= 0) {
                    pdefenceturn -= 1;
                    console.log(pdefenceturn)
                }
                if (pdefenceturn == 0 && enemyHealth >= 0) {
                    playerSeraphim = {
                        "defence": 1,
                        "reason": `None`,
                    };
                    console.log(pdefenceturn, playerSeraphim)
                }
                if (edefenceturn > 0 && enemyHealth >= 0) {
                    edefenceturn -= 1;
                    console.log(edefenceturn)
                }
                if (edefenceturn == 0 && enemyHealth >= 0) {
                    enemySeraphim = {
                        "defence": 1,
                        "reason": `None`,
                    };
                    console.log(edefenceturn, enemySeraphim)
                }
                if (pdefenceturn2 > 0 && enemyHealth >= 0) {
                    pdefenceturn2 -= 1;
                    console.log(pdefenceturn2)
                }
                if (pdefenceturn2 == 0 && enemyHealth >= 0) {
                    enemyKanaph = {
                        "defence": 1,
                        "reason": `None`,
                    };
                    console.log(pdefenceturn2, enemyKanaph)
                }
                if (edefenceturn2 > 0 && enemyHealth >= 0) {
                    edefenceturn2 -= 1;
                    console.log(edefenceturn2)
                }
                if (edefenceturn2 == 0 && enemyHealth >= 0) {
                    playerKanaph = {
                        "defence": 1,
                        "reason": `None`,
                    };
                    console.log(edefenceturn2, playerKanaph)
                }
                if ((playerReiryoku >= 100 || enemyReiryoku >= 100) && enemyHealth >= 0) {
                    
                    playerAbilityName = pAbilityArray[randomizer(0, pAbilityArray.length)]
                    enemyAbilityName = eAbilityArray[randomizer(0, eAbilityArray.length)]
                    if (playerReiryoku >= 100 && enemyReiryoku >= 100) {
                        if (playerAbilityName != 'Zayin') await wait(4000)
                        playerAbility()

                        if (enemyAbilityName != 'Zayin') await wait(4000)
                        enemyAbility()

                        console.log(playerAbilityName, enemyAbilityName, "b")

                    } else {
                        if ((playerReiryoku >= 100) && enemyHealth >= 0) {

                            playerAbilityName = pAbilityArray[randomizer(0, pAbilityArray.length)]

                            if (playerAbilityName != 'Zayin') await wait(4000)
                            playerAbility()
                            
                        console.log(playerAbilityName, enemyAbilityName, "p")

                        }
                        if ((enemyReiryoku >= 100) && enemyHealth >= 0) {

                            enemyAbilityName = eAbilityArray[randomizer(0, eAbilityArray.length)]

                            if (enemyAbilityName != 'Zayin') await wait(4000)
                            enemyAbility()
                            
                        console.log(playerAbilityName, enemyAbilityName, "e")
                        }
                    }
                } else {
                    if (enemyHealth <= 0) {

                        message.channel.send(`**${spiritSearch.name}** wins!`);


                        const idfind = inFighting.find(c => c === message.author.id)
                        await inFighting.splice(inFighting.indexOf(idfind), 1)
                        const idfinda = inFighting.find(c => c === enemyuser.id)
                        await inFighting.splice(inFighting.indexOf(idfinda), 1)


                        return;

                    }
                    else {
                        if (playerabilityturns > 0) {
                            await wait(4000);
                            playerAbilityAttack(enemyHealth)
                            console.log(playerabilityturns)
                        }
                        if (enemyabilityturns > 0) {
                            await wait(4000);
                            enemyAbilityAttack()
                            console.log(enemyabilityturns)
                        }
                        if (playerabilityturns === 0 && enemyabilityturns === 0) {

                            const pflip = Math.ceil(Math.random() * 100)
                            if ((pflip <= enemyspiritStats.agility / 10) && playerSureHit === 0) playerMiss += 1
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
                                message.channel.send(`**${spiritSearch.name} wins!**`);

                                const idfinda = inFighting.find(c => c === message.author.id)
                                await inFighting.splice(inFighting.indexOf(idfinda), 1)
                                const idfindaa = inFighting.find(c => c === enemyuser.id)
                                await inFighting.splice(inFighting.indexOf(idfindaa), 1)


                                return;
                            }
                            const eflip = Math.ceil(Math.random() * 100)
                            if ((eflip <= spiritStats.agility / 10) && enemySureHit === 0) enemyMiss += 1
                            await wait(4000);
                            if (enemyMiss < 1) {
                                enemyAttack(eMaxDamage);
                                playerhealthatm = playerHealth
                            } else {
                                playerEvade()
                                enemyMiss -= 1
                                console.log(enemyMiss)
                            }
                        }

                        rounds += 1
                    }
                }
            }
            rounds = 0
            message.channel.send(`**${enemyspiritSearch.name}** wins!`)

            const idfind = inFighting.find(c => c === message.author.id)
            await inFighting.splice(inFighting.indexOf(idfind), 1)
            const idfinda = inFighting.find(c => c === enemyuser.id)
            await inFighting.splice(inFighting.indexOf(idfinda), 1)
        }

        fight((enemymaxHealth), enemyspiritStats.strength)
    },
};