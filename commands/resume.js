const { MessageEmbed } = require('discord.js');
module.exports = {
name: "resume",
run: async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send('❌ You must be in a voice channel to use this command.');

    let queue = await client.distube.getQueue(message);

    if(queue) {
        client.distube.resume(message)

    let dEmbed = new MessageEmbed();
      dEmbed.setDescription(`✅ Successfully resumed the music!`)
      dEmbed.setColor("#00E7FF")
    message.reply(dEmbed)
    } else if (!queue) {
        return
    };


}
}
