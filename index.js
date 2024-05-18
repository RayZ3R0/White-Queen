require("dotenv").config();
require('simply-xp')
const keep_alive = require('./keep_alive.js')
const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
const discordModals = require('discord-modals') 
discordModals(client);
// Initializing the project
require("./handler")(client);
const xp = require('simply-xp')
    xp.connect(process.env['mongo'])

        
client.login(process.env.DISCORD_TOKEN);
