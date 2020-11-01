const serverSettingsSchema = require('@schemas/server-settings-schema');
const config = require('@root/config.json');

module.exports = (client) => {
    client.on('guildCreate', async (guild) => {
        await serverSettingsSchema({
            _id: guild.id,
            prefix: config.prefix,
            features: {
                autoban: config.features.autoban
            }
        }).save();
    });
}