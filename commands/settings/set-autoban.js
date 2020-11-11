const serverSettingsSchema = require('@schemas/server-settings-schema');

module.exports = {
    commands: 'setautoban',
    expectedArgs: '<state> <channel>',
    minArgs: 1,
    maxArgs: 2,
    callback: async (message, arguments, text, client, prefix, traslations) => {
        const userState = arguments[0];
        const guild = message.guild.id;
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

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            $set: {
                "features.autoban.state": state(),
                "features.autoban.log_channel": log_channel()
            }
        }, {
            upsert: true
        });

        console.log(`Reloading feature: autoban on ${message.guild.name}`);

        message.channel.send(traslations.reply + `\`${userState}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}