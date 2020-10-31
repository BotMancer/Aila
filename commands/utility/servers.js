const { MessageEmbed } = require('discord.js');
module.exports = {
    commands: 'servers',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        client.guilds.cache.forEach((guild) => {
            const embed = new MessageEmbed()
                .setTitle('Elenco Server')
                .setColor('#F59EFF')
                .setDescription('Elenco dei server dove è presente il bot.')
                .setThumbnail('https://i.imgur.com/YGNKjhc.png')
                .addFields(
                    { name: 'Nome Server', value: `\`${guild.name}\``, inline: true},
                    { name: 'ID Server', value: `\`${guild.id}\``, inline: true},
                    { name: 'Joinato il', value: `\`${guild.joinedAt}\``},
                    { name: 'Owner del server', value: `${guild.owner}`, inline: true},
                    { name: 'Membri del server', value: `${guild.memberCount}`, inline: true}
                )
            message.channel.send(embed);
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}