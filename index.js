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

const mongo = require('./db/mongo')
const config = require('./config.json');
const command = require('./command');

client.on('ready', async () => {
    console.log('Il bot è pronto!');

    await mongo().then(mongoose => {
        try {
            console.log('Connected!')
        } finally {
            mongoose.connection.close();
        }
    });

    const { prefix } = config;
    client.user.setPresence({
        activity: {
            name: `${prefix}help | comandi.`,
            type: 3
        }
    });

    const autoBan = require(`./events/security/autoban`)
    const readEvents = () => {
        autoBan(client);
    }
    readEvents();

    //Advanced Command Handler implementation
    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(client, option);
            }
        }
    }
    readCommands('commands')

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