const { MessageEmbed } = require('discord.js');
const { color } = require('@root/config.json');
const serverSettingsSchema = require('@schemas/server-settings-schema');

const language = require('@i18n/i18n');

function DiffDays(creationDate, todayDate) {
    var timeDiff = todayDate - creationDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const checkState = async (guildID) => {
    const serverSettings = await serverSettingsSchema.findOne({ _id: guildID });
    const { state, log_channel } = serverSettings.features['autoban'];
    return { state, log_channel };
}

module.exports = (client, guild, featurePath) => {
    client.on('guildMemberAdd', async (member) => {
        if (guild == member.guild) {
            //Get traslated properties from DB.
            const traslations = language(guild, featurePath[0], featurePath[1], featurePath[2]);

            //Getting state from DB.
            const { state, log_channel } = await checkState(member.guild.id);

            //Checking state and if true ban user.
            if (state) {
                var todayDate = new Date();
                todayDate = (todayDate.getMonth() + 1) + '/' + todayDate.getDate() + '/' + todayDate.getFullYear();
                const memberCreationDate = new Intl.DateTimeFormat('en-US').format(member.user.createdAt);
                const memberAge = DiffDays(Date.parse(memberCreationDate), Date.parse(todayDate));

                if (memberAge <= 3) {
                    console.log(`Activating security measures on ${member.user.username} - ${member.id}`);
                    member.ban({
                        reason: traslations.reason
                    }).then(() => {
                        if (log_channel != null || log_channel != undefined) {
                            const embed = new MessageEmbed()
                                .setAuthor(traslations.title + client.user.username, client.user.displayAvatarURL())
                                .setFooter(`Sent ${new Date(message.createdTimestamp).toLocaleDateString()} at ${new Date(message.createdTimestamp).toLocaleTimeString()}`)
                                .setColor(color)
                                .addFields(
                                    { name: 'Target', value: `<@${member.id}>` },
                                    { name: 'Reason', value: `L'account non rispetta i 3 giorni di registrazione minimi richiesti.` }
                                )
                            const logChannel = member.guild.channels.cache.get(log_channel);

                            logChannel.send(embed);
                        }
                    });
                };
            }
        }
    });
}