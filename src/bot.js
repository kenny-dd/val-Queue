const {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  Collection,
} = require("discord.js");
require("dotenv/config");

const fs = require("fs");
const prefix = "-";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Reaction],
});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);

// client.on("ready", () => [console.log("val-queue is online!")]);

// client.on("messageCreate", async (message) => {
//   if (message.content === "ping") {
//     const reply = await message.reply("pong");
//     reply.react("✅");
//   }
// });

// client.on("messageReactionAdd", (reaction) => {
//   console.log(reaction);
// });
