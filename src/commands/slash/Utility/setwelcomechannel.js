const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const testing = require('../../../schemas/GuildSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the welcome channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select the welcome channel')
                .setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options } = interaction;
        const channelID = options.getChannel('channel').id;

        try {
            await testing.findOneAndUpdate({}, { ChannelID: channelID }, { upsert: true });
            await interaction.reply('Welcome channel set correctly');
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error setting the welcome channel.');
        }
    }
};
