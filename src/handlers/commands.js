const { readdirSync } = require('fs');
const { log } = require('../functions');
const ExtendedClient = require('../class/ExtendedClient');

/**
 * 
 * @param {ExtendedClient} client 
 */
module.exports = (client) => {
    for (const type of readdirSync('./src/commands/')) {
        // biome-ignore lint/style/useTemplate: <explanation>
        for (const dir of readdirSync('./src/commands/' + type)) {
            // biome-ignore lint/style/useTemplate: <explanation>
            for (const file of readdirSync('./src/commands/' + type + '/' + dir).filter((f) => f.endsWith('.js'))) {
                // biome-ignore lint/style/useTemplate: <explanation>
                const module = require('../commands/' + type + '/' + dir + '/' + file);

                if (!module) continue;

                if (type === 'prefix') {
                    if (!module.structure?.name || !module.run) {
                        // biome-ignore lint/style/useTemplate: <explanation>
                        log('Unable to load the command ' + file +' due to missing \'structure#name\' or/and \'run\' properties.', 'warn');
        
                        continue;
                    };

                    client.collection.prefixcommands.set(module.structure.name, module);

                    if (module.structure.aliases && Array.isArray(module.structure.aliases)) {
                        // biome-ignore lint/complexity/noForEach: <explanation>
                        module.structure.aliases.forEach((alias) => {
                            client.collection.aliases.set(alias, module.structure.name);
                        });
                    };
                } else {
                    if (!module.structure?.name || !module.run) {
                        // biome-ignore lint/style/useTemplate: <explanation>
                        log('Unable to load the command ' + file +' due to missing \'structure#name\' or/and \'run\' properties.', 'warn');
        
                        continue;
                    };

                    client.collection.interactioncommands.set(module.structure.name, module);
                    client.applicationcommandsArray.push(module.structure);
                };

                // biome-ignore lint/style/useTemplate: <explanation>
                log('Loaded new command: ' + file, 'info');
            };
        };
    };
};