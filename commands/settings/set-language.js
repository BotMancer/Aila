const serverSettingsSchema = require('@schemas/server-settings-schema');
const { languages } = require('@i18n/commands.json')
const { setLanguage } = require('@i18n/i18n');

module.exports = {
    commands: ['setlang', 'setlanguage'],
    expectedArgs: '<language>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const { guild } = message;

        const newLanguage = arguments[0].toLowerCase();

        if (!languages.includes(newLanguage)) {
            message.reply('Language not supported.');
            return
        }

        setLanguage(guild, newLanguage);

        await serverSettingsSchema.findByIdAndUpdate({
            _id: guild.id
        }, {
            $set: {
                "language": newLanguage
            }
        }, {
            upsert: true
        })

        message.reply(`The new server language is: \`${newLanguage}\``);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}