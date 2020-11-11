const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');

module.exports = {
    commands: 'servers',
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        let current = 0;
        client.guilds.cache.forEach((guild) => {
            current++;
            const embed = new MessageEmbed()
                .setTitle(`Server ${current}`)
                .setColor(color)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: 'Server name', value: `\`${guild.name}\``, inline: true },
                    { name: 'Server ID', value: `\`${guild.id}\``, inline: true },
                    { name: 'Joined', value: `\`${guild.joinedAt}\`` },
                    { name: 'Server\'s owner', value: `${guild.owner}`, inline: true },
                    { name: 'Server\'s members', value: `${guild.memberCount}`, inline: true }
                )
            message.channel.send(embed);
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}