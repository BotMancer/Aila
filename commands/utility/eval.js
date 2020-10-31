const { ownerID } = require('../../config.json');
const { permissions } = require('./status');
module.exports = {
    commands: 'eval',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        if(message.member.id === ownerID){
            let result = eval(arguments);
            message.reply(result);
        }
    },
    permissions: 'ADMINISTRATOR'
}