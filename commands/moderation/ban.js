module.exports = {
    commands: ['ban', 'fuckoff'],
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        message.delete();
        const targetUser = message.mentions.users.first();
        const targetMember = message.guild.member(targetUser);
        targetMember.ban().then(() => {
            message.reply(`l'utente ${targetMember} è stato bannato dal server.`);
        });
    },
    permissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
    requiredRoles: [],
}