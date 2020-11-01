const path = require('path');
const fs = require('fs');

const serverSettingsSchema = require('@schemas/server-settings-schema');


module.exports = (client) => {
    const loadFile = 'load-features.js';
    const readFeatures = async (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readFeatures(path.join(dir, file));
            } else if (file !== loadFile) {
                for (const guild of client.guilds.cache) {
                    const guildID = guild[1].id;
                    const featureName = file.split('.')[0];
                    const feature = require(path.join(__dirname, dir, file));

                    const result = await serverSettingsSchema.findOne({ _id: guildID });

                    for (const featureProp in result.features) {
                        if (featureName === featureProp) {
                            feature(client, guild[1], result.features[featureProp]);
                        }
                    }
                }
            }
        }
    }

    readFeatures('.');
}

module.exports.reloadFeature = (featurePath, featureName, client, guild, enabled) => {
    const featureToReload = require(`@features/${featurePath}.js`);
    console.log(`Reloading feature: ${featureName} on ${guild.name}`);
    featureToReload(client, guild, enabled);
}