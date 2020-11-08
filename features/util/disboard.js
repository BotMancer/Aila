const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');
const serverSettingsSchema = require('@schemas/server-settings-schema');

const checkState = async (guildID) => {
    const serverSettings = await serverSettingsSchema.findOne({ _id: guildID });
    const { state, log_channel, role } = serverSettings.features['disboard'];
    return { state, log_channel, role };
}


module.exports = async (client, guild) => {
    let notification;

    let timer = 7200000; //2h.
    let bumped = false;

    function startInterval(ms) {
        notification = setInterval(async function sendNotification() {
            const { state, log_channel, role } = await checkState(guild.id);

            if (state) {
                const embed = new MessageEmbed()
                    .setTitle('Disboard cooldown is off!')
                    .setColor(color)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(`Hya <@&${role}>! The cooldown to Bump the Server is over, type immediately \`!d bump\` to bump again!`)
                const logChannel = guild.channels.cache.get(log_channel);

                logChannel.send(`<@&${role}>`, { embed })
                bumped = false;
            }
        }, ms);
    }
    startInterval(timer);

    client.on('message', async (message) => {
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
                .setTitle('Cooldown resetted!')
                .setColor(color)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Nice! The next appointment is in 2 hours, don\'t forget it!`)
            message.channel.send(embed);

            clearInterval(notification);
            startInterval(timer);
        }
    });
}