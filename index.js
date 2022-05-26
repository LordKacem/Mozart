
const usedCommand = new Set();

const Discord = require('discord.js');
const { Permissions } = require('discord.js');
const client = new Discord.Client ();
const { Client, MessageAttachment, MessageEmbed, Intents } = require('discord.js');
require("dotenv").config();
const config = require('./config.json');

const { readdirSync } = require('fs');
const { join } = require('path');

const PREFIX = '+';

client.commands= new Discord.Collection();
   
const DisTube = require('distube')

const fetch = require('node-fetch');
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./loading');

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnEmpty: true });
client.distube
    .on("playSong", (message, queue, song) => {
     let dEmbed = new MessageEmbed()

      dEmbed.setDescription(`🎤 Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
      dEmbed.setColor("#00E7FF")

let loadingId = localStorage.getItem('loading');

//Editing the "loading" once the song is ready.
message.channel.messages.fetch(loadingId)
  .then(message => {
    if(message.embeds.length > 0){
      message.channel.send(dEmbed)
    } else {
      message.edit('', dEmbed)
    }
    
  })
  .catch(console.error);
      
    })
  
	.on("addSong", (message, queue, song) => {

         let dEmbed = new MessageEmbed()
      dEmbed.setDescription(`🎤 Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
      dEmbed.setColor("#00E7FF")
    

//Editing the "loading" once the song is ready.
    let loadingId = localStorage.getItem('loadingg');

    message.channel.messages.fetch(loadingId)
  .then(message => message.edit('', dEmbed))
  .catch(console.error);
    })



const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on('ready', () =>{

   console.log('This bot is online!');
// Edit the bot status here.
   client.user.setActivity(`If you would dance, I'll play the tune on my little guitar..`, {type: "LISTENING"}); 

})

    client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = PREFIX

//Command handler
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;
        try {
    if(usedCommand.has(message.author.id)){
        return message.reply({embed: {color: "RED", description:  "A little bit too fast there!"}})
    } else {

            client.commands.get(command).run(client, message, args);

                   usedCommand.add(message.author.id);
        setTimeout(() => {
            usedCommand.delete(message.author.id);
        }, 100); //Edit the cooldown for commands here

    }    
        } catch (error){
            console.error(error);
        }
    }
})


    client.login(config.token); // Or "process.env.CLIENT_TOKEN" if you are using ENV.

    
