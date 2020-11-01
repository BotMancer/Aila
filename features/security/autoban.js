//Embed Declaration
const { MessageEmbed } = require('discord.js');

function DiffDays(creationDate, todayDate) {
    var timeDiff = todayDate - creationDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};
module.exports = (client, guild, enabled) => {
    if (enabled) {
        console.log(`Enabled feature: Autoban on ${guild.name}`);
        client.on('guildMemberAdd', (member) => {
            console.log('boh, works.');
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
                const logChannelID = '739939847439122472';
                const logChannel = member.guild.channels.cache.get(logChannelID);
                console.log(`Attivazione misure di sicurezza sull'account ${member.user.username} - ${member.id}`);
                member.ban().then(logChannel.send(embed));
            };
        });
    } else {
        console.log(`Disabled feature: Autoban on ${guild.name}`);
    }
}