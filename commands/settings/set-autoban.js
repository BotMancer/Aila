const serverSettingsSchema = require('@schemas/server-settings-schema');

module.exports = {
    commands: 'setautoban',
    expectedArgs: '<enabled/disabled>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        const guild = message.guild.id;
        const state = () => {
            if (arguments[0] === 'enabled') return true;
            if (arguments[0] === 'disabled') return false;
        }

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            features: {
                autoban: state()
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