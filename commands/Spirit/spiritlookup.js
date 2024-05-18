const { Message, Client, MessageEmbed } = require("discord.js");
const spiritSchema = require('../../schema/spirits')
const profileSchema = require('../../schema/profile')
const sp = require('../../spirits.json')
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

const casea = { 
    "kurumi tokisaki" : "Kurumi Tokisaki",
    'kotori itsuka':'Kotori Itsuka',
    'miku izayoi': 'Miku Izayoi',
    'kyouno natsumi': 'Kyouno Natsumi',
    'nia honjou': 'Nia Honjou',
    'kaguya yamai': 'Kaguya Yamai',
    'yuzuru yamai': 'Yuzuru Yamai',
    'mukuro hoshimiya': 'Mukuro Hoshimiya',
    'tobiichi origami': 'Tobiichi Origami',
    'himekawa yoshino': 'Himekawa Yoshino',
    'tohka yatogami': 'Tohka Yatogami',
    "kurumi" : "Kurumi Tokisaki",
    'kotori':'Kotori Itsuka',
    'miku': 'Miku Izayoi',
    'kyouno': 'Kyouno Natsumi',
    'natsumi': 'Kyouno Natsumi',
    'nia': 'Nia Honjou',
    'kaguya': 'Kaguya Yamai',
    'yuzuru': 'Yuzuru Yamai',
    'mukuro': 'Mukuro Hoshimiya',
    'tobiichi': 'Tobiichi Origami',
    'origami': 'Tobiichi Origami',
    'himekawa': 'Himekawa Yoshino',
    'yoshino': 'Himekawa Yoshino',
    'tohka': 'Tohka Yatogami'
}

const fillStart = '<a:fillStart:1004299985153699931>'
const fillBar = '<a:fillBar:1004300044347920456>'
const fillEnd = '<a:fillEnd:1004300092628533259>'
const emptyStart = '<:emptyStart:1004300146483404801>'
const emptyBar = '<:emptyBar:1004300236073742356>'
const emptyEnd = '<:emptyEnd:1004300260526522489>'


const starBuff = {
    '1': 1,
    '2': 1.1,
    '3': 1.2,
    '4': 1.3,
    '5': 1.5
}

module.exports = {
    name: "spiritlookup",
    aliases: ['spiritinfo'],
    description: `Check a spirit's base stats and information.`,
    usage: `<spiritName>`,
    timeout: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const namespirit = casea[args.join(' ').toLowerCase()]
        let spiritStats = sp[namespirit]
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`${namespirit}`)
            .addFields(
                {
                    name: 'HP',
                    value: `${spiritStats.hp}`
                },
                {
                    name: 'Strength',
                    value: `${spiritStats.strength}`
                },
                {
                    name: 'Defence',
                    value: `${spiritStats.defence}`
                },
                {
                    name: `Agility`,
                    value: `${spiritStats.agility}`
                },
                {
                    name: `Abilities`,
                    value: `${spiritStats.abilities.join(', ')}`
                }
            )
            .setImage(spiritImages[namespirit])
            .setFooter({ text: spiritStats.quotes })
        message.reply({ embeds: [embed] })

    },
};


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
