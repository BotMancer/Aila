const serverSettingsSchema = require('@schemas/server-settings-schema');
const commandBase = require('@commands/command-base');

module.exports = {
    commands: 'setprefix',
    expectedArgs: '<new prefix>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, prefix, traslations) => {
        const guild = message.guild.id;
        const prefix = arguments[0];

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            $set: {
                "prefix": prefix
            }
        }, {
            upsert: true
        });

        message.reply(traslations.reply + `\`${prefix}\``);

        //Update cache
        commandBase.updateCache(guild, prefix);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}