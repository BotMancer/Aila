const serverSettingsSchema = require('@schemas/server-settings-schema');
const config = require('@root/config.json');

module.exports = (client) => {
    client.on('guildCreate', async (guild) => {
        await serverSettingsSchema({
            _id: guild.id,
            prefix: config.prefix,
            language: config.language,
            features: {
                autoban: {
                    state: config.features.autoban,
                    log_channel: null
                },
                disboard: {
                    state: config.features.disboard,
                    log_channel: null,
                    role: null
                }
            }
        }).save();
    });
}