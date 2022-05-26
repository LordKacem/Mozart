
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports = {
name: "queue",
run: async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send('❌ You must be in a voice channel to use this command.');

       let queue = client.distube.getQueue(message);

       let dEmbed = new MessageEmbed()
      dEmbed.setTitle("🎤 The Current Queue")
      dEmbed.setDescription(queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"))
      dEmbed.setColor("#00E7FF")

  message.channel.send(dEmbed)

}
}
