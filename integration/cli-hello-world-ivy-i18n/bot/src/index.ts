import {
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  VoiceState,
  ChannelType,
  Guild,
} from 'discord.js';
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  VoiceConnection,
} from '@discordjs/voice';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// --- OpenAI and Discord Clients ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// --- State Management ---
interface Conversation {
  connection: VoiceConnection;
  player: import('@discordjs/voice').AudioPlayer;
  textChannelId: string;
  messageQueue: string[];
  isSpeaking: boolean;
  history: { role: 'user' | 'assistant'; content: string }[];
}
const conversations = new Map<string, Conversation>();

// --- Bot Logic ---

client.once('ready', () => console.log('Bot is ready!'));

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  const guildId = message.guildId;
  if (!guildId) return;

  // Command Handling
  if (message.content.startsWith('!')) {
    handleCommand(message);
    return;
  }

  const conversation = conversations.get(guildId);
  // If bot is in a voice channel and monitoring this text channel
  if (conversation && conversation.textChannelId === message.channel.id) {
    // Add message to conversation history
    conversation.history.push({ role: 'user', content: `${message.author.username}: ${message.content}` });
    if (conversation.history.length > 10) {
      conversation.history.shift(); // Keep history to the last 10 messages
    }

    // If bot is mentioned, trigger conversational AI
    if (message.mentions.has(client.user!.id)) {
      triggerConversationalAI(message, conversation);
    } else {
      // Otherwise, add to TTS queue
      conversation.messageQueue.push(message.content);
      processQueue(guildId);
    }
  }
});

async function handleCommand(message: Message) {
  const [command] = message.content.slice(1).split(' ');
  const guildId = message.guildId!;

  if (command === 'join') {
    const voiceChannel = message.member?.voice.channel;
    if (voiceChannel && voiceChannel.type === ChannelType.GuildVoice) {
      if (conversations.has(guildId)) {
        message.reply("I'm already in a voice channel on this server.");
        return;
      }
      try {
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

        const player = createAudioPlayer();
        connection.subscribe(player);

        const conversation: Conversation = {
          connection,
          player,
          textChannelId: message.channel.id,
          messageQueue: [],
          isSpeaking: false,
          history: [],
        };
        conversations.set(guildId, conversation);

        player.on(AudioPlayerStatus.Idle, () => {
          conversation.isSpeaking = false;
          processQueue(guildId);
        });

        player.on('error', (error) => {
          console.error(`Audio player error in guild ${guildId}:`, error);
          conversation.isSpeaking = false;
          processQueue(guildId);
        });
        
        message.reply(`Joined ${voiceChannel.name} and now monitoring this channel for messages.`);

      } catch (error) {
        console.error(error);
        message.reply('Failed to join the voice channel.');
      }
    } else {
      message.reply('You need to be in a voice channel to use this command!');
    }
  } else if (command === 'leave') {
    const conversation = conversations.get(guildId);
    if (conversation) {
      conversation.connection.destroy();
      conversations.delete(guildId);
      message.reply('Left the voice channel.');
    } else {
      message.reply("I'm not in a voice channel on this server.");
    }
  }
}

async function processQueue(guildId: string) {
  const conversation = conversations.get(guildId);
  if (!conversation || conversation.isSpeaking || conversation.messageQueue.length === 0) {
    return;
  }

  conversation.isSpeaking = true;
  const text = conversation.messageQueue.shift()!;

  try {
    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    });

    const resource = createAudioResource(speech.body as any, { inputType: StreamType.WebmOpus });
    conversation.player.play(resource);

  } catch (error) {
    console.error(`Error generating or playing audio in guild ${guildId}:`, error);
    conversation.isSpeaking = false;
    processQueue(guildId); // Try next item in queue
  }
}

async function triggerConversationalAI(message: Message, conversation: Conversation) {
    const guildId = message.guildId!;
    try {
        const prompt = `The following is a conversation in a Discord chat. The user "${message.author.username}" has just mentioned you. Respond to their message in a helpful and conversational way. 

Conversation History:
${conversation.history.map(h => `${h.role}: ${h.content}`).join('
')}

Your Response:`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
        });

        const replyText = response.choices[0].message.content;
        if (replyText) {
            conversation.history.push({ role: 'assistant', content: replyText });
            if (conversation.history.length > 10) {
                conversation.history.shift();
            }
            // Add AI response to the front of the queue to be spoken immediately
            conversation.messageQueue.unshift(replyText);
            processQueue(guildId);
        }
    } catch (error) {
        console.error(`Error with conversational AI in guild ${guildId}:`, error);
        message.reply("Sorry, I had a little trouble thinking of a response.");
    }
}


client.login(process.env.DISCORD_TOKEN);