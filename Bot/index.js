/* eslint-disable no-console */
const Discord = require('discord.js');
const { prefix, token } = require('./config.json'); 
const client = new Discord.Client()

let status = true;
let exclude = [];


client.on('ready', () => {
    var channels = client.channels.find(channels => channels.name === 'general'); // find the name of the 'general' text channel
    console.log("I'm Ready");
    //console.log(client.user); // bots info

    // channels.send("I'm ready! (testing)"); // output a message saying the bot is ready for action!
});


// When a user joins a voice channel, the bot joins it as well.
client.on('voiceStateUpdate', (oldState, newState) => {
    if (status){
        console.log("Old: " + oldState.channel); 
        console.log("New: " + newState.channel); 
        var oldChannel = oldState.channel;// Old voice channel; Undefined if not in one.
        var newChannel = newState.channel;// New voice channel; undefined if not joining another.
        var member = oldState.member;
        console.log(member.user.bot);
        if (newChannel) {
            newChannel.join().then(connection =>{
                console.log("Connected!");
                if (!member.user.bot){
                    const dispatcher = connection.play('./clips/mynamejeff.mp3');
                }
            }).catch(console.error);
            
        } else if (oldChannel) {
            oldChannel.leave();
        }
    } // end status
}); // end voiceStatusUpdate 


// This is a leave server command
client.on('message', message => {
    if (message.content.toLowerCase() === `${prefix}leave` && message.member.id == '163726071315955712'){
       let guild = message.guild;
        message.channel.send("By-O");
        guild.leave(); // leave server
    } else if (message.content === '!showMeGod'){
        let avatar = client.user.avatarURL; // get avatar URL
        message.channel.send(avatar);
    }
});


// Make the bot start / stop joining the channel.
client.on('message', message => {
    if (message.content.toLowerCase() ===`${prefix}stop`) {
        status = false;
        message.channel.send('I won\'t talk anymore :upside_down:');
    } else if (message.content.toLowerCase() === `${prefix}start` && status === false) {
        status = true;
        message.channel.send('I\'m back :grinning:');
    } else if (message.content.toLowerCase() === `${prefix}start` && status === true){ 
        message.channel.send('I am already on!');
    }
})


//exclude / include users in the fun!
client.on('message', message => {
    let user = message.member.id;
    if (message.content.toLowerCase() === `${prefix}exclude`) {
        if (exclude.length == 0){ 
            exclude.push(user);
        }
        for (var i = 0; i < exclude.length; i++) {
            if (exclude[i].indexOf(user) > -1) {
                console.log("User found!");
            } else {
                console.log('User added!');
            }
        }
        console.log(exclude);
    } else if (message.content.toLowerCase() === `${prefix}include`){
        for (var x = 0; x < exclude.length; x++){
            if (exclude[x] === user){
                exclude.splice(x, 1);
            }
        }
        console.log(exclude);
    }
});


// Help command!
client.on('message', message => {
    if (message.content.toLowerCase() === `${prefix}help`){
        message.channel.send({embed: {
            color: 15158332,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "Help",
            description: "This bot welcomes users to the channel they're joining with an audio clip!\n\n Commands to control this bot are as follows:",
            fields: [{
                name: "!help",
                value: "Get this message."
            },
            {
                name: "!stop",
                value: "Turns the bot off."  
            },
            {
                name: "!start",
                value: "Turns the bot back on."
            },
            {
                name: "!exclude",
                value: "The bot will not join YOU anymore."
            },
            {
                name: "!include",
                value: "The bot will join YOU again."
            },
            {
                name: "Feedback",
                value: "Leave any feedback or ideas with Jiroscopes. :poop:"
            }]
        }});
    }
})


client.login(token); // Login to the server