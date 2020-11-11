const serverSettingsSchema = require('@schemas/server-settings-schema');
const lang = require('@i18n/languages.json');

const guildLanguages = {};

module.exports = (guild, section, category, id) => {
    if (!lang.traslations[section][category][id]) {
        throw new Error(`Unknown ID "${id}"`);
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase();

    return lang.traslations[section][category][id][selectedLanguage];
}

module.exports.loadLanguages = async (client) => {
    //Fetch all the per-server languages.
    for (const guild of client.guilds.cache) {
        const guildID = guild[0];

        const server = await serverSettingsSchema.findOne({
            _id: guildID,
        });

        guildLanguages[guildID] = server ? server.language : 'english';
    }
}

module.exports.setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase();
}

