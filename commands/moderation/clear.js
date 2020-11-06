module.exports = {
    commands: 'clear',
    expectedArgs: '<amount>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const amount = parseInt(arguments);
        if (isNaN(amount)) {
            message.reply(`Incorrect syntax. Insert a number.`);
        } else {
            message.delete();
            message.channel.messages.fetch().then(() => {
                message.channel.bulkDelete(amount);
            });
        };
    },
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    requiredRoles: [],
}