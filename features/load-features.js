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
                            const state = result.features[featureProp].state;
                            if (state) {
                                console.log(`Enabled feature: ${featureName} on ${guild[1].name}`);
                            } else {
                                console.log(`Disabled feature: ${featureName} on ${guild[1].name}`);
                            }
                        }
                    }
                    feature(client, guild[1]);
                }
            }
        }
    }

    readFeatures('.');
}