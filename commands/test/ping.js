module.exports = {
    commands: 'ping',
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        message.reply('pong!')
    },
}