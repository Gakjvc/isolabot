const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const path = require('path');
require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const cron = require("node-cron"); //TEMPO
const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates 
  ]
});
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com Pong!')
    .toJSON(),

  new SlashCommandBuilder()
  .setName('bolsonaro')
  .setDescription('Prosopa Putaria e ponto final')
  .toJSON()
];
(async () => {
  try {
    console.log('🔄 Registrando comandos...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    console.log('✅ Comando registrado.');
  } catch (error) {
    console.error(error);
  }
})();
client.once("ready", () => {
  console.log(`✅ Bot logado como ${client.user.tag}`);
  cron.schedule("0 22 * * 2", () => {
    const canal = client.channels.cache.get("1159116759702458491");
    if (canal) 
      {
        canal.send("<@388721407229427722> saia da oficina");
      }
    }, 
    {
      timezone: "America/Sao_Paulo"
    });
  });

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'bolsonaro') {
    await  interaction.reply('fudido'),
    tocaMusicaSlash(interaction.member, 'audios/bolsonaro.mp3');
  }
});

  const gif = "https://tenor.com/view/jojos-bizarre-adventure-jojos-traitors-requiem-golden-wind-vento-aureo-gif-24253226";
  const silvaId = "@173421126901432320";
  client.on('messageCreate', message => {
    if (message.content.includes(silvaId) && message.mentions.users.size === 1) {
    message.reply("https://cdn.discordapp.com/attachments/498319060568899584/1407476468065374208/image.png?ex=68a63e1b&is=68a4ec9b&hm=bb2fdaad07175dd326004da6f31675c39f1607161c4ab5355575ec53c540a424&");
  }
  if(message.content === gif) {
    message.channel.send(gif);
  }
  if(message.content === '!infinite') {
    message.channel.send(gif);
  }
  if(message.content === '!help') {
    message.reply("Comandos disponíveis:\n!mag\n!escusado\n!pt\n!bolsonaro\n!roast\n!nununajungle");
  }
  switch(message.content) {
    case '!mag':
      tocaMusica(message, 'audios/mag.mp3');
      break;
    case '!escusado':
      tocaMusica(message, 'audios/ESCUSADO.mp3');
      break;
    case '!pt':
      tocaMusica(message, 'audios/pt.mp3');
      break;
    case '!bolsonaro':
      tocaMusica(message, 'audios/bolsonaro.mp3');
      break;
    case '!roast':
      tocaMusica(message, 'audios/roast.mp3');
      break;
    case '!nununajungle':
    tocaMusica(message, 'audios/nununajungle.mp3');
      break;
    case '!shen':
    tocaMusica(message, 'audios/shen.mp3');
      break;
    }
}); 
            

const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
function tocaMusica(message, arquivo) {
  const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return message.reply("❌ Você precisa estar em um canal de voz!");
    message.react("1407540492085755925"); 
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    // Criar player e recurso
    const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, arquivo)); // ou .wav
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Playing, () => console.log('🎶 Tocando áudio!'));
}

function tocaMusicaSlash(user, arquivo) {
  const voiceChannel = user.voice.channel;
    if (!voiceChannel) return;
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    // Criar player e recurso
    const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, arquivo)); // ou .wav
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Playing, () => console.log('🎶 Tocando áudio!'));
}


client.login(TOKEN);