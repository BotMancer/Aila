const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['help', 'comandi'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client, prefix) => {
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
    }
}