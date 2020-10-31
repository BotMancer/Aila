const { DiscordAPIError } = require("discord.js");

module.exports = {
    commands: 'kick',
    expectedArgs: '<user>',
    permissionError: 'non hai i permessi necessari per eseguire questo comando.',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        message.delete();
        const targetUser = message.mentions.users.first();
        const targetMember = message.guild.member(targetUser);
        targetMember.kick().then(() => {
            message.reply(`l'utente ${targetMember} è stato kickato dal server.`);
        });
    },
    permissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
    requiredRoles: [],
}