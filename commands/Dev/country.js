const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment } = require('discord.js');

const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
module.exports = {
    name: 'country',
    // aliases: [' '],
    description: 'No.',
    //  timeout: 3000,
    //  usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async (client, message, args) => {
        const owners = [
            '636598760616624128'
        ]
        if (!owners.includes(message.author.id)) return;


        const generateCanva = async (datas) => {
            const renderer = new ChartJSNodeCanvas({ width: 800, height: 300 });
            const image = await renderer.renderToBuffer({
                // Build your graph passing option you want
                type: "pie", // Show a bar chart
                backgroundColor: "rgba(236,197,1)",
                data: {
                    labels: ["Asia", "North America", "South America", "Europe", "Australia", "Africa"],
                    datasets: [
                        {
                            label: "Continents",
                            data: datas,
                            backgroundColor: [
                                'rgb(245, 17, 5)',
                                'rgb(238, 255, 0)',
                                'rgb(0, 255, 0)',
                                'rgb(7, 245, 237)',
                                'rgb(12, 5, 237)',
                                'rgb(255, 10, 169)',
                                
                            ]
                        },
                    ],
                },
            });
            return new MessageAttachment(image, "graph.png");
        };

        let asia = 0;
        let northamerica = 0;
        let southamerica = 0
        let europe = 0
        let australia = 0;
        let africa = 0
        message.guild.members.cache.forEach(mem => {
            if (mem.roles.cache.has('901408545617113088')) asia++

            if (mem.roles.cache.has('901408620263116800')) northamerica++

            if (mem.roles.cache.has('901408576650764308')) southamerica++

            if (mem.roles.cache.has('901408693130768404')) europe++

            if (mem.roles.cache.has('901408661107277844')) australia++

            if (mem.roles.cache.has('901408638864850995')) africa++
        })

        let data = [asia, northamerica, southamerica, europe, australia, africa]

        const chartEmbed = new MessageEmbed({
            title: "Server members Continents.",
            color: "RED",
          });
          chartEmbed.setImage("attachment://graph.png");
          chartEmbed.setDescription(`**Asia:** ${asia}, **North America:** ${northamerica}, **South America:** ${southamerica}, **Europe:** ${europe}, **Australia:** ${australia}, **Africa:** ${africa}`)
      
          // Generate your graph & get the picture as response
          const attachment = await generateCanva(data);
      
          // Reply to server / channel you  want passing MessageEmbed & messageAttachment objects
          message.reply({ embeds: [chartEmbed], files: [attachment] });



    },
};