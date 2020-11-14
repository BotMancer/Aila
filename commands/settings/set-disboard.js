const serverSettingsSchema = require('@schemas/server-settings-schema');

module.exports = {
    commands: 'setdisboard',
    expectedArgs: '<state> <channel> <role>',
    minArgs: 1,
    maxArgs: 3,
    callback: async (message, arguments, text, client, prefix, traslations) => {
        const userState = arguments[0]; //User input for state.
        const guild = message.guild.id; //Current guild.

        //validate user input for state
        if (userState != 'enabled' && userState != 'disabled') {
            message.channel.send(`\`${userState}\` ` + traslations.error);
            return;
        }
        const state = () => {
            if (userState === 'enabled') return true;
            if (userState === 'disabled') return false;
        }

        //validate user input for #logchannel
        const log_channel = () => {
            if (message.mentions.channels.first() === undefined) return null;
            if (userState === 'disabled') return null;
            if (userState === 'enabled') return message.mentions.channels.first().id;
        }

        //validate user input for role to ping
        const role = () => {
            if (message.mentions.roles.first() === undefined) return null;
            if (userState === 'disabled') return null;
            if (userState === 'enabled') return message.mentions.roles.first().id;
        }

        //Updating DB document.
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

        message.channel.send(traslations.reply + `\`${userState}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}