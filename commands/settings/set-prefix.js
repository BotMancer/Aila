const serverSettingsSchema = require('@schemas/server-settings-schema');
const commandBase = require('@commands/command-base');

module.exports = {
    commands: 'setprefix',
    expectedArgs: '<new prefix>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, prefix, traslations) => {
        const newPrefix = arguments[0]; //User input for prefix.
        const guild = message.guild.id; //Current guild.

        //Updating DB document.
        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            $set: {
                "prefix": newPrefix
            }
        }, {
            upsert: true
        });

        message.reply(traslations.reply + `\`${newPrefix}\``);

        //Update bot cache.
        commandBase.updateCache(guild, newPrefix);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}