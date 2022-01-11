const config = require("./config/config.json");
const { Client, Intents, ThreadChannel } = require("discord.js");

const prefix = "!";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
  ],
});

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   if (!message.content.startsWith(prefix)) return;

//   const commandBody = message.content.slice(prefix.length);
//   const args = commandBody.split(" ");
//   const command = args.shift().toLowerCase();

//   if (command === "ping") {
//     const timeTaken = Date.now() - message.createdTimestamp;
//     message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
//   } else if (command === "sum") {
//     const numArgs = args.map((x) => parseFloat(x));
//     const sum = numArgs.reduce((counter, x) => (counter += x));
//     message.reply(`The sum of all the arguments you provided is ${sum}!`);
//   } else if (command === "clear") {
//     message.channel.bulkDelete(100);
//   }
// });

client.on("voiceStateUpdate", (oldState, newState) => {
  if (oldState.member.user.bot) return;

  if (oldState.channelId !== null) {
    if (oldState.channel.name !== "│Voice Erstellen") {
      if (
        oldState.channel.members.size === 0 &&
        oldState.channel.parent.name === "───Voice────────"
      ) {
        oldState.channel.delete();
      }
    }
  }

  if (newState.channelId !== null) {
    if (newState.channel.name === "│Voice Erstellen") {
      newState.channel
        .clone({
          name: `│${newState.member.displayName}'s Voice`,
        })
        .then((newChannel) => {
          newState.member.voice.setChannel(newChannel);
        });
    }
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.login(config.BOT_TOKEN);
