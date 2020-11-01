require('module-alias/register');

//Advanced Command Handler
const path = require('path');
const fs = require('fs');
//Discord
const Discord = require('discord.js');
const client = new Discord.Client();
//Embed Declaration
const { MessageEmbed } = require('discord.js');
//Dotenv
require('dotenv').config();

const mongo = require('@db/mongo');
const config = require('@root/config.json');
const command = require('@root/command');
const loadCommands = require('@commands/load-commands');
const commandBase = require('@commands/command-base');
const loadFeatures = require('@features/load-features');

client.on('ready', async () => {
    console.log('Il bot è pronto!');

    await mongo().then(mongoose => {
        try {
            console.log('Connected!')
        } finally {
            mongoose.connection.close();
        }
    });
    commandBase.loadPrefixes(client);
    loadCommands(client);
    loadFeatures(client);

    const { prefix } = config;
    client.user.setPresence({
        activity: {
            name: `${prefix}help | comandi.`,
            type: 3
        }
    });

    //Comando: Help
    command(client, ['help', 'comandi'], (message) => {
        const embed = new MessageEmbed()
            .setColor('#F59EFF')
            .setTitle(`Comandi - Prefisso \`${prefix}\``)
            .setThumbnail('https://i.imgur.com/YGNKjhc.png')
            .addFields(
                { name: `${prefix}help`, value: 'Visualizza questo messaggio.' },
                { name: `${prefix}status`, value: 'Aggiorna lo status del bot.' },
                { name: `${prefix}servers`, value: 'Visualizza i server dove è presente il bot.' },
                { name: `${prefix}ban <user>`, value: 'Banna l\'utente.' },
                { name: `${prefix}kick <user>`, value: 'Kicka l\'utente.' },
                { name: `${prefix}clear <quantità>`, value: 'Cancella una quantità specifica di messaggi.' },
                { name: `${prefix}clearAll`, value: 'Cancella __tutti__ i messaggi all\'interno di un canale.' }
            )
        message.channel.send(embed);
    });
});

client.login(process.env.BOT_TOKEN);