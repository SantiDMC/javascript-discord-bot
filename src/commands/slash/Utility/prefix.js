const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Set a new prefix for the server.')
        .addStringOption(option =>
            option.setName('prefix')
            .setDescription('The new Prefix')
            .setRequired(false)
            ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        //pending :b
    }
};