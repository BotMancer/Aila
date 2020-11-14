const { ownerID } = require('@root/config.json');

module.exports = {
    commands: 'eval',
    expectedArgs: '<command>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        //Check if the user is the bot owner.
        if (message.member.id === ownerID) {
            eval(arguments.toString());
        }
    },
    permissions: 'ADMINISTRATOR'
}