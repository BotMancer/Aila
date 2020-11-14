module.exports = {
    commands: ['cc', 'clearall'],
    maxArgs: 0,
    callback: (message) => {
        message.delete(); //Delete the invocation message.

        message.channel.messages.fetch().then((all) => {
            message.channel.bulkDelete(all);
        });
    },
    permission: 'ADMINISTRATOR',
    requiredRoles: [],
};