const { ownerID } = require('../../config.json');
const { permissions } = require('./status');
module.exports = {
    commands: 'eval',
    minArgs: 0,
    callback: (message, arguments, text, client) => {
        if(message.member.id === ownerID){
            let result = eval(text);
            message.reply(result);
        }
    },
    permissions: 'ADMINISTRATOR'
}