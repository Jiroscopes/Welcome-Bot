/* eslint-disable no-console */
const Discord = require('discord.js')
const { prefix, token } = require('./config.json'); 
const client = new Discord.Client()



client.on('ready', () => {
    var isReady = true;
    channels = client.channels.find(channels => channels.name === 'general'); // find the name of the 'general' text channel
    console.log("I'm Ready");
    //console.log(client.user); // bots info

    channels.send("I'm ready! (testing)"); // output a message saying the bot is ready for action!
});

// When a user joins a voice channel, the bot joins it as well.
client.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log("Old: " + oldMember.voiceChannel); 
    console.log("New: " + newMember.voiceChannel); 
    oldChannel = oldMember.voiceChannel;// Old voice channel; Undefined if not in one.
    newChannel = newMember.voiceChannel;// New voice channel; undefined if not joining another.
    if (newChannel) {
        isReady = false;
        newChannel.join().then(connection =>{
            console.log("Connected!")
            const dispatcher = connection.playFile('./mynamejeff.mp3');
            dispatcher.setVolume(0.5);
            // dispatcher.on('end', end => newChannel.leave());
            console.log(dispatcher.time)
        }).catch(console.error);
        
    } else if (oldChannel) {
        oldChannel.leave();
    }
})

// This is a leave server command
client.on('message', message => {
    if (message.content === '!leave'){
       let guild = message.guild;
        message.channel.send("By-O");
        guild.leave(); // leave server
    } else if (message.content === '!showMeGod'){
        let avatar = client.user.avatarURL; // get avatar URL
        message.channel.send(avatar);
    }
});


  client.login(token); // Login to the server