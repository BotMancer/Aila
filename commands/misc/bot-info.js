const { MessageEmbed } = require('discord.js');
const { version } = require('@root/package.json');
const { color } = require('@root/config.json');

module.exports = {
    commands: 'botinfo',
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const guilds = client.guilds.cache.size;

        //Getting users amount cross-servers.
        let globalUsers = 0;
        for (const guild of client.guilds.cache) {
            globalUsers += guild[1].memberCount;
        }

        const { username, id } = client.user;
        const embed = new MessageEmbed()
            .setAuthor(`${username}`, client.user.displayAvatarURL())
            .setFooter(`ID: ${id} • Sent ${new Date(message.createdTimestamp).toLocaleDateString()} at ${new Date(message.createdTimestamp).toLocaleTimeString()}`)
            .setColor(color)
            .addFields(
                { name: 'Version', value: version, inline: true },
                { name: 'Language', value: 'Node.js', inline: true },
                { name: 'Daddy', value: 'isla#8212', inline: true },
                { name: 'Servers', value: guilds, inline: true },
                { name: 'Users', value: globalUsers, inline: true }
            )

        message.channel.send(embed);
    }
}