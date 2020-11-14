const serverSettingsSchema = require('@schemas/server-settings-schema');
const { languages } = require('@i18n/languages.json')
const { setLanguage } = require('@i18n/i18n');

module.exports = {
    commands: ['setlang', 'setlanguage'],
    expectedArgs: '<language>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, prefix, traslations) => {
        const newLanguage = arguments[0].toLowerCase(); //User input for language.
        const { guild } = message; //Current Guild object.

        //validate user input for language.
        if (!languages.includes(newLanguage)) {
            message.reply(traslations.error);
            return
        }

        //Update bot cache.
        setLanguage(guild, newLanguage);

        //Updating DB document.
        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild.id
        }, {
            $set: {
                "language": newLanguage
            }
        }, {
            upsert: true
        })

        message.reply(traslations.reply + `\`${newLanguage}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}