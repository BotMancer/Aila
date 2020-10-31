const { ownerID } = require('../../config.json');
module.exports = {
    commands: 'eval',
    expectedArgs: '<comand>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        await message.react("🌸");
        if(message.member.id === ownerID){
            eval(arguments.toString());
        }
    },
    permissions: 'ADMINISTRATOR'
}