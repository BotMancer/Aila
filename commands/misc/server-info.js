const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');

module.exports = {
    commands: 'serverinfo',
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const guild = message.guild;
        const icon = guild.iconURL() || client.user.displayAvatarURL();

        //Getting list of type-divided channels.
        let voiceChannels = 0;
        let textChannels = 0;
        let categories = 0;
        for (const channel of guild.channels.cache) {
            const { type } = channel[1];
            if (type === 'text') textChannels++;
            if (type === 'voice') voiceChannels++;
            if (type === 'category') categories++;
        }

        const embed = new MessageEmbed()
            .setAuthor(`${guild.name}`, icon)
            .setThumbnail(icon)
            .setFooter(`ID: ${guild.id} • Sent ${new Date(message.createdTimestamp).toLocaleDateString()} at ${new Date(message.createdTimestamp).toLocaleTimeString()}`)
            .setColor(color)
            .addFields(
                { name: 'Owner', value: `${guild.owner.user.tag}`, inline: true },
                { name: 'Region', value: `${guild.region.charAt(0).toUpperCase() + guild.region.slice(1)}`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created', value: new Date(guild.createdTimestamp).toLocaleString() },
                { name: 'Text Channels', value: textChannels.toString(), inline: true },
                { name: 'Voice Channels', value: voiceChannels.toString(), inline: true },
                { name: 'Categories', value: categories.toString(), inline: true },
            )

        message.channel.send(embed);
    }
}