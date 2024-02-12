const { ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js");
const ExtendedClient = require("../../../class/ExtendedClient");
const guildSchema2 = require("../../../schemas/GuildSchema");

module.exports = {
  structure: new SlashCommandBuilder()
    .setName("testdatabase")
    .setDescription("testing database"),
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    guildSchema2.findOne({ GuildID: interaction.guild.id }).then((data) => {
      if (!data) {
        guildSchema2.create({
          guildID: interaction.guild.id,
          guildName: interaction.guild.name,
        });
      } else {
        console.log(data);
      }
    });
  },
};
