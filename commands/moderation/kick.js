module.exports = {
    commands: 'kick',
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client, prefix, traslations) => {
        message.delete(); //Delete the invocation message.

        const targetUser = message.mentions.users.first(); //User mentioned.
        const targetMember = message.guild.member(targetUser); //Related Guildmember.

        targetMember.kick().then(() => {
            message.channel.send(`${targetMember}` + traslations.reply);
        });
    },
    permissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
    requiredRoles: [],
}