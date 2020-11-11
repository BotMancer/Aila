const { prefix } = require('@root/config.json');

module.exports = {
    commands: 'status',
    expectedArgs: '<type(0/3)> <text..>',
    minArgs: 2,
    callback: (message, arguments, text, client, prefix, traslations) => {
        const type = +arguments[0];
        if (isNaN(type)) {
            message.channel.send(traslations.error + `\`${prefix}status ${traslations.expArgs}\``);
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