const { MessageEmbed } = require('discord.js');

module.exports = {
name: "pause",
run: async (client, message, args) => {

if (!message.member.voice.channel) return message.channel.send('❌ You must be in a voice channel to use this command.');

    let queue = await client.distube.getQueue(message);

    if(queue) {
        client.distube.pause(message)

    let dEmbed = new MessageEmbed();
      dEmbed.setDescription(`✅ Successfully paused the music!`)
      dEmbed.setColor("#00E7FF")
    message.reply(dEmbed)
    } else if (!queue) {
        return
    };
}
}
