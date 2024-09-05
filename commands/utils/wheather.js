const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { WHEATHER_API_KEY } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get the current weather for a location')
    .addStringOption(option =>
      option.setName('location')
        .setDescription('The city and country to check the weather for')
        .setRequired(true)),

  async execute(interaction) {
    const location = interaction.options.getString('location');
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WHEATHER_API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle(`Weather in ${data.name}, ${data.sys.country}`)
        .setDescription(`${data.weather[0].description}`)
        .setThumbnail(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        .addFields(
          { name: 'Temperature', value: `${data.main.temp}°C`, inline: true },
          { name: 'Feels Like', value: `${data.main.feels_like}°C`, inline: true },
          { name: 'Humidity', value: `${data.main.humidity}%`, inline: true },
          { name: 'Wind Speed', value: `${data.wind.speed} m/s`, inline: true }
        )
        .setColor('#0099ff')
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      await interaction.reply('There was an error while fetching the weather data. Please try again later.');
    }
  },
};
