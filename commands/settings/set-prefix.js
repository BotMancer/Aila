const mongo = require('../../db/mongo');
const serverSettingsSchema = require('../../db/schemas/server-settings-schema');

module.exports = {
    commands: 'setprefix',
    expectedArgs: '<new prefix>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        await mongo().then(async mongoose => {
            try{
                const guild = message.guild.id;
                const prefix = arguments[0];

                await serverSettingsSchema.findByIdAndUpdate({
                    _id: guild
                }, {
                    _id: guild,
                    prefix
                }, {
                    useFindAndModify: false,
                    upsert: true
                });

                message.reply(`Il prefisso per questo server è ora: ${prefix}`);
            } finally{
                mongoose.connection.close();
            }
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}