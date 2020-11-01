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
                    const result = await serverSettingsSchema.findOne({ _id: guildID });
                    for (const featureSetting in result.features) {
                        if (file.split('.')[0] === featureSetting && result.features[featureSetting] === true) {
                            const feature = require(path.join(__dirname, dir, file));
                            console.log(`Enabling feature: ${file.split('.')[0]} on ${guild[1].name}`);
                            feature(client);
                        } else {
                            console.log(`Disabling feature: ${file.split('.')[0]} on ${guild[1].name}`);
                        }
                    }
                }
            }
        }
    }

    readFeatures('.');
}