const serverSettingsSchema = require('@schemas/server-settings-schema');
const lang = require('@i18n/languages.json');

const guildLanguages = {};

module.exports = (guild, section, category, id) => {
    //Check if selected language is supported.
    if (!lang.traslations[section][category][id]) {
        throw new Error(`Unknown ID "${id}"`);
    }

    //Get the current per-server selected language.
    const selectedLanguage = guildLanguages[guild.id].toLowerCase();

    //Return traslations.
    return lang.traslations[section][category][id][selectedLanguage];
}

module.exports.loadLanguages = async (client) => {
    //Fetch all the per-server languages.
    for (const guild of client.guilds.cache) {
        const guildID = guild[0]; //Guild ID

        //Getting DB documents.
        const server = await serverSettingsSchema.findOne({
            _id: guildID,
        });

        //Caching per-server selected languages.
        guildLanguages[guildID] = server ? server.language : 'english';
    }
}

module.exports.setLanguage = (guild, language) => {
    //Update bot cache.
    guildLanguages[guild.id] = language.toLowerCase();
}

