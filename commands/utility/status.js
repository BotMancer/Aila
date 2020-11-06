const { prefix } = require('@root/config.json');

module.exports = {
    commands: 'status',
    expectedArgs: '<type(0/3)> <text..>',
    minArgs: 2,
    callback: (message, arguments, text, client) => {
        const type = +arguments[0];
        if (isNaN(type)) {
            let alias = 'status';
            let expectedArg = '<type(0/3)> <text..>';
            message.reply(`sintassi del comando errata. Usa: \`${prefix}${alias} ${expectedArg}\``);
        } else {
            const action = text.slice(2);
            client.user.setPresence({
                activity: {
                    name: action,
                    type: type
                }
            });
        }
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}