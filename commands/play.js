const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
    const LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./loading');
module.exports = {


name: "play",
run: async (client, message, args) => {
    if (!message.member.voice.channel) {
     let dEmbed = new MessageEmbed()

      dEmbed.setDescription(`❌ You must be in a voice channel in order to use this command.`)
      dEmbed.setColor("#00E7FF")
      
    return message.channel.send(dEmbed);
    }
    
    const music = args.join(" ");

    client.distube.play(message, music)
  message.channel.send("🔍 ** **").then(sent => {  //Edit the "loading" emoji here
  let id = sent.id;
    if(client.voice.connections.size > 0){
localStorage.setItem('loadingg', sent.id);
} else {
localStorage.setItem('loading', sent.id);
}
    
    });
    
    
  }

}
