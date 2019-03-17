/* eslint-disable no-console */
const Discord = require('discord.js')
const { prefix, token } = require('./config.json'); 
const client = new Discord.Client()

client.on('ready', () => {

    channels = client.channels.find(channels => channels.name === 'general'); // find the name of the 'general' text channel
    console.log(channels);
    console.log("I'm Ready");

    channels.send("I'm ready! (testing)"); // output a message saying the bot is ready for action!
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