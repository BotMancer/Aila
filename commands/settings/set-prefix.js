const mongo = require('@db/mongo');
const serverSettingsSchema = require('@schemas/server-settings-schema');
const commandBase = require('@commands/command-base');

module.exports = {
    commands: 'setprefix',
    expectedArgs: '<new prefix>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        const guild = message.guild.id;
        const prefix = arguments[0];

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild
        }, {
            _id: guild,
            prefix
        }, {
            upsert: true
        });

        message.reply(`Il prefisso per questo server è ora: \`${prefix}\``);

        //Update cache
        commandBase.updateCache(guild, prefix);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}