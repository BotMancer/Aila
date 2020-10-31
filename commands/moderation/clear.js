const { prefix } = require('../../config.json');
module.exports = {
    commands: 'clear',
    expectedArgs: '<quantità>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const amount = parseInt(arguments);
        if(isNaN(amount)){
            let alias = 'clear';
            let expectedArg = '<quantità>';
            message.reply(`sintassi del comando errata. Usa: \`${prefix}${alias} ${expectedArg}\``);
        } else{
            message.delete();
            message.channel.messages.fetch().then(() => {
                message.channel.bulkDelete(amount);
            });
        };
    },
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    requiredRoles: [],
}