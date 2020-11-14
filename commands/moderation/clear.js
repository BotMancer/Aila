module.exports = {
    commands: 'clear',
    expectedArgs: '<amount>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client, prefix, traslations) => {
        message.delete(); //Delete the invocation message.

        const amount = parseInt(arguments); //Amout of messages to delete.

        if (isNaN(amount)) {
            message.reply(traslations.error);
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