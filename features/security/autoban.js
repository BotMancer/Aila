//Embed Declaration
const { MessageEmbed } = require('discord.js');
const serverSettingsSchema = require('@schemas/server-settings-schema');

function DiffDays(creationDate, todayDate) {
    var timeDiff = todayDate - creationDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const checkState = async (guildID) => {
    const serverSettings = await serverSettingsSchema.findOne({ _id: guildID });
    const { state, log_channel } = serverSettings.features['autoban'];
    return { state, log_channel };
}

module.exports = (client, guild) => {
    client.on('guildMemberAdd', async (member) => {
        if (guild == member.guild) {
            //Getting state from DB.
            const { state, log_channel } = await checkState(member.guild.id);
            //Checking state and if true ban user.
            if (state) {
                var todayDate = new Date();
                todayDate = (todayDate.getMonth() + 1) + '/' + todayDate.getDate() + '/' + todayDate.getFullYear();
                const memberCreationDate = new Intl.DateTimeFormat('en-US').format(member.user.createdAt);
                const memberAge = DiffDays(Date.parse(memberCreationDate), Date.parse(todayDate));
                if (memberAge <= 3) {
                    const embed = new MessageEmbed()
                        .setTitle('Membro Bannato')
                        .setColor('#F59EFF')
                        .setThumbnail(client.user.displayAvatarURL())
                        .addFields(
                            { name: 'Target', value: `<@${member.id}>` },
                            { name: 'Motivazione', value: `L'account non rispetta i 3 giorni di registrazione minimi richiesti.` }
                        )

                    console.log(`Attivazione misure di sicurezza sull'account ${member.user.username} - ${member.id}`);
                    member.ban().then(() => {
                        if (log_channel != null || log_channel != undefined) {
                            const logChannel = member.guild.channels.cache.get(log_channel);
                            logChannel.send(embed);
                        }
                    });
                };
            }
        }
    });
}