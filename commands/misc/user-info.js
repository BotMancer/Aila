const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');

module.exports = {
    commands: 'userinfo',
    expectedArgs: '<user>',
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const user = message.mentions.users.first() || message.member.user;
        const member = message.guild.members.cache.get(user.id);

        //Getting list of user roles except "@everyone".
        const roles = [];
        for (const role of member.roles.cache) {
            const { name, id } = role[1];
            if (name != '@everyone') roles.push(`<@&${id}>`);
        }
        if (roles.length === 0) roles.push('None');

        const embed = new MessageEmbed()
            .setAuthor(`${user.tag}`, user.displayAvatarURL())
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setFooter(`ID: ${user.id} • Sent ${new Date(message.createdTimestamp).toLocaleDateString()} at ${new Date(message.createdTimestamp).toLocaleTimeString()}`)
            .setColor(color)
            .addFields(
                { name: 'Created', value: new Date(user.createdTimestamp).toLocaleString(), inline: true },
                { name: 'Joined', value: new Date(member.joinedTimestamp).toLocaleString(), inline: true },
                { name: 'User ID', value: `${user.id}`, inline: false },
                { name: `Roles [${Math.max(0, member.roles.cache.size - 1)}]`, value: `${roles}` }
            )

        message.channel.send(embed);
    }
}