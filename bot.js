const Discord = require("discord.js");
const config = require("./config/config.json");
const animeCommands = require("./commands/anime.js");
const helpCommands = require("./commands/help.js");
const logger = require("./untils/logger.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (message) => {
  if (message.content.startsWith(prefix + "search")) {
    const query = message.content
      .substring(prefix.length + "search".length)
      .trim();
    const results = searchAnime(query);
    // Handle search results
  } else if (message.content.startsWith(prefix + "help")) {
    showHelp();
  }
});

client.login(token);

// Example logging
logMessage("Bot is running.");
