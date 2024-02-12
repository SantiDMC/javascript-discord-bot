const { readdirSync } = require('fs');
const { log } = require('../functions');
const ExtendedClient = require('../class/ExtendedClient');

/**
 * 
 * @param {ExtendedClient} client 
 */
module.exports = (client) => {
    for (const dir of readdirSync('./src/events/')) {
        // biome-ignore lint/style/useTemplate: <explanation>
        for (const file of readdirSync('./src/events/' + dir).filter((f) => f.endsWith('.js'))) {
            // biome-ignore lint/style/useTemplate: <explanation>
            const module = require('../events/' + dir + '/' + file);

            if (!module) continue;

            if (!module.event || !module.run) {
                // biome-ignore lint/style/useTemplate: <explanation>
                log('Unable to load the event ' + file + ' due to missing \'name\' or/and \'run\' properties.', 'warn');

                continue;
            };
            
            // biome-ignore lint/style/useTemplate: <explanation>
            log('Loaded new event: ' + file, 'info');

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            };
        };
    };
};