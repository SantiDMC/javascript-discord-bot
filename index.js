const { Client, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: [3276799] });
const config = require("./config.json");

client.once("ready", () => {
  console.log("Online Bot");
});

client.on("messageCreate", async (message) => {
  const prefix = config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
});

client.login(config.token); 