//Embed Declaration
const { MessageEmbed } = require('discord.js');
const serverSettingsSchema = require('@schemas/server-settings-schema');

function DiffDays(creationDate, todayDate) {
    var timeDiff = todayDate - creationDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

const checkState = async (guildID) => {
    const serverSettings = await serverSettingsSchema.findOne({ _id: guildID });
    const state = serverSettings.features['autoban'];
    return state;
}

module.exports = (client, guild) => {
    client.on('guildMemberAdd', async (member) => {
        if (guild == member.guild) {
            //Getting state from DB.
            const state = await checkState(member.guild.id);
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
                        .setThumbnail('https://i.imgur.com/YGNKjhc.png')
                        .addFields(
                            { name: 'Target', value: `<@${member.id}>` },
                            { name: 'Motivazione', value: `L'account non rispetta i 3 giorni di registrazione minimi richiesti.` }
                        )
                    //const logChannelID = '772206449891475506';
                    //const logChannel = member.guild.channels.cache.get(logChannelID);
                    console.log(`Attivazione misure di sicurezza sull'account ${member.user.username} - ${member.id}`);
                    member.ban();//.then(logChannel.send(embed));
                };
            }
        }
    });
}