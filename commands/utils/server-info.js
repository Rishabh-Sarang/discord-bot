const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the server.'),
  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} Server Information`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Created At', value: guild.createdAt.toDateString(), inline: true },
        { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true }
      )
      .setColor('#0099ff');

    await interaction.reply({ embeds: [embed] });
  },
};