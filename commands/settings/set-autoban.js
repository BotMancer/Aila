const serverSettingsSchema = require('@schemas/server-settings-schema');

module.exports = {
    commands: 'setautoban',
    expectedArgs: '<state> <channel>',
    minArgs: 1,
    maxArgs: 2,
    callback: async (message, arguments, text, client) => {
        const guild = message.guild.id;
        //validate user input for state
        const state = () => {
            if (arguments[0] === 'enabled') return true;
            if (arguments[0] === 'disabled') return false;
        }
        //validate user input for #logchannel
        const log_channel = () => {
            if (message.mentions.channels.first() === undefined) return null;
            if (arguments[0] === 'disabled') return null;
            if (arguments[0] === 'enabled') return message.mentions.channels.first().id;
        }

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            features: {
                autoban: {
                    state: state(),
                    log_channel: log_channel()
                }
            }
        }, {
            upsert: true
        });

        console.log(`Reloading feature: autoban on ${message.guild.name}`);

        message.channel.send(`Autoban feature state: \`${arguments[0]}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}