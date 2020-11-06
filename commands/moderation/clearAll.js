module.exports = {
    commands: ['cc', 'clearall'],
    maxArgs: 0,
    callback: (message) => {
        message.delete();

        message.channel.messages.fetch().then((all) => {
            message.channel.bulkDelete(all);
        });
    },
    permission: 'ADMINISTRATOR',
    requiredRoles: [],
};