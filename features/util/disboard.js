const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');
const serverSettingsSchema = require('@schemas/server-settings-schema');

const language = require('@i18n/i18n');

const checkState = async (guildID) => {
    const serverSettings = await serverSettingsSchema.findOne({ _id: guildID });
    const { state, log_channel, role } = serverSettings.features['disboard'];
    return { state, log_channel, role };
}


module.exports = async (client, guild, featurePath) => {
    let notification;

    let timer = 7200000; //2h.
    let bumped = false;

    //Reminder function.
    function startInterval(ms) {
        notification = setInterval(async function sendNotification() {
            //Get traslated properties from DB.
            const traslations = language(guild, featurePath[0], featurePath[1], featurePath[2]);

            //Getting state from DB.
            const { state, log_channel, role } = await checkState(guild.id);

            if (state) {
                const embed = new MessageEmbed()
                    .setTitle(traslations.reminder.title)
                    .setColor(color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(`Hya <@&${role}>! ${traslations.reminder.message}`)
                const logChannel = guild.channels.cache.get(log_channel);

                logChannel.send(`<@&${role}>`, { embed })
                bumped = false;
            }
        }, ms);
    }
    startInterval(timer);

    //Checking for !d bump Disboard command.
    client.on('message', async (message) => {
        //Get traslated properties from DB.
        const traslations = language(guild, featurePath[0], featurePath[1], featurePath[2]);

        //Getting state from DB.
        const { log_channel } = await checkState(guild.id);

        /*
        * Check if the !d bump messase was sent in the right channel.
        * Check if the server was not already bumped:
        *   - if not, reset the cooldown and set bumped to true.
        *   - if yes, don't reset anything, just wait for the next possible bump.
        */
        if (message.channel.id == log_channel && message.content === '!d bump' && !bumped) {
            bumped = true;

            const embed = new MessageEmbed()
                .setTitle(traslations.reset.title)
                .setColor(color)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(traslations.reset.message)
            message.channel.send(embed);

            clearInterval(notification);
            startInterval(timer);
        }
    });
}