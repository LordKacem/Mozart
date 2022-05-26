const { MessageEmbed } = require('discord.js');
module.exports = {
name: "skip",
run: async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send('❌ You must be in a voice channel to use this command.');

    let queue = await client.distube.getQueue(message);
    if(queue) {
      try{
        client.distube.skip(message)
        
} catch(err){
  console.log(err)
}
          let dEmbed = new MessageEmbed();
      dEmbed.setDescription(`✅ Successfully skipped the song!`)
      dEmbed.setColor("#00E7FF")
      
message.reply(dEmbed)
    } else if (!queue) {
        return
    };

}
}
