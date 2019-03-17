/* eslint-disable no-console */
const Discord = require('discord.js')
const { prefix, token } = require('./config.json');
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

// client.on('message', message => {
//     let username = message.member.user.username;
//     if (message != '' && username === 'Jiroscopes'){
//         message.channel.send('Yes king');
//     } else if (message != '' && username !='Jiroscopes' && !message.author.bot){
//         // message.channel.send();
//         return;
//     }
// });

// client.on('voiceStateUpdate', (oldMember, newMember) => {
//     let newUserChannel = newMember.voiceChannel
//     let oldUserChannel = oldMember.voiceChannel
//     let userVoiceChannel = newMember.voiceChannelID;
  
//     if(oldUserChannel === undefined && newUserChannel !== undefined) {
//        if (!userVoiceChannel) return console.error("The channel does not exist");
//             client.channels.get(userVoiceChannel).join(connection => {
//                 console.log("Connected");
//             }).catch(e => {
//                 console.error(e);
//             });
//         } else if(newUserChannel === undefined){
//             console.log('User left');
//                 client.voiceChannel.leave();
//             }
//     });


client.on('message', message => {
    if (message.content === '!leave'){
       let guild = message.guild;
    //    console.log(guild);
        message.channel.send("By-O");
        guild.leave();
    } else if (message.content === '!showMeGod'){
        let avatar = client.user.avatarURL;
        message.channel.send(avatar);
    }
});

  client.login(token);