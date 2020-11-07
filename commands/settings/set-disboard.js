const serverSettingsSchema = require('@schemas/server-settings-schema');

module.exports = {
    commands: 'setdisboard',
    expectedArgs: '<state> <channel> <role>',
    minArgs: 1,
    maxArgs: 3,
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
        //validate user input for role to ping
        const role = () => {
            if (message.mentions.roles.first() === undefined) return null;
            if (arguments[0] === 'disabled') return null;
            if (arguments[0] === 'enabled') return message.mentions.roles.first().id;
        }

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            $set: {
                "features.disboard.state": state(),
                "features.disboard.log_channel": log_channel(),
                "features.disboard.role": role()
            }
        }, {
            upsert: true
        });

        console.log(`Reloading feature: disboard on ${message.guild.name}`);

        message.channel.send(`Disboard feature state: \`${arguments[0]}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}