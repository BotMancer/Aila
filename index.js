require('module-alias/register'); //'@' routes NodeJS module.
require('dotenv').config(); //.env NodeJS module.

//Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Bot Configuration files.
const mongo = require('@db/mongo');
const config = require('@root/config.json');
const loadEvents = require('@events/load-events');
const loadCommands = require('@commands/load-commands');
const commandBase = require('@commands/command-base');
const loadFeatures = require('@features/load-features');

//Bot main function.
client.on('ready', async () => {
    console.log('Aila is ready!');

    await mongo().then(() => { console.log('Aila is connected to MongoDB database!') });
    loadEvents(client);
    commandBase.loadPrefixes(client);
    loadCommands(client);
    loadFeatures(client);

    client.user.setPresence({
        activity: {
            name: `${config.prefix}help | comandi.`,
            type: 2
        }
    });
});

//Bot login on Discord servers.
client.login(process.env.BOT_TOKEN);