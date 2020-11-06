const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');

module.exports = {
    commands: ['help', 'comandi'],
    maxArgs: 0,
    callback: (message, arguments, text, client, prefix) => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`Commands - Prefix \`${prefix}\``)
            .setThumbnail(client.user.displayAvatarURL())
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
    }
}