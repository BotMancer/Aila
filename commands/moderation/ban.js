module.exports = {
    commands: 'ban',
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client, prefix, traslations) => {
        message.delete();
        const targetUser = message.mentions.users.first();
        const targetMember = message.guild.member(targetUser);

        targetMember.ban().then(() => {
            message.channel.send(`${targetMember}` + traslations.reply);
        });
    },
    permissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
    requiredRoles: [],
}