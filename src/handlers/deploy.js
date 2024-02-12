const { REST, Routes } = require("discord.js");
const { log, isSnowflake } = require("../functions");
const config = require("../config");
const ExtendedClient = require("../class/ExtendedClient");

/**
 *
 * @param {ExtendedClient} client
 */
module.exports = async (client) => {
    const rest = new REST({ version: "10" }).setToken(
        config.client.token
    );

    try {
        log("Started loading application commands... (this might take minutes!)", "info");

        const guildId = config.development.guild;

        // biome-ignore lint/complexity/useOptionalChain: <explanation>
        if (config.development && config.development.enabled && guildId) {
            if (!isSnowflake(guildId)) {
                log("Guild ID is missing. Please configure it in config.js or disable development in the configuration", "err");
                return;
            };

            await rest.put(
                Routes.applicationGuildCommands(config.client.id, guildId), {
                    body: client.applicationcommandsArray,
                }
            );

            log(`Successfully loaded application commands to guild ${guildId}.`, "done");
        } else {
            await rest.put(
                Routes.applicationCommands(config.client.id), {
                    body: client.applicationcommandsArray,
                }
            );

            log("Successfully loaded application commands globally to Discord API.", "done");
        }
    } catch (e) {
        log(`Unable to load application commands to Discord API: ${e.message}`, "err");
    }
};
