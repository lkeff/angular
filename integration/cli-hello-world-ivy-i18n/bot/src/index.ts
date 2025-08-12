import { Client, GatewayIntentBits, Attachment, Interaction } from 'discord.js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.attachments.size > 0) {
    const attachment = message.attachments.first();
    if (attachment && attachment.contentType?.startsWith('audio/')) {
      try {
        const audioURL = attachment.url;
        const response = await axios.get(audioURL, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(response.data);

        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir);
        }

        const tempFilePath = path.join(tempDir, attachment.name);
        fs.writeFileSync(tempFilePath, audioBuffer);

        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(tempFilePath),
          model: 'whisper-1',
        });

        fs.unlinkSync(tempFilePath);

        message.reply(`Transcription: ${transcription.text}`);
      } catch (error) {
        console.error('Error transcribing audio:', error);
        message.reply('Sorry, I had trouble transcribing that audio.');
      }
    }
  }
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'generate') {
    const text = interaction.options.get('text')?.value as string;

    if (!text) {
      await interaction.reply({ content: 'You need to provide text to generate audio.', ephemeral: true });
      return;
    }

    try {
      await interaction.deferReply();

      const speech = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
      });

      const buffer = Buffer.from(await speech.arrayBuffer());
      const tempDir = path.join(__dirname, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const tempFilePath = path.join(tempDir, 'speech.mp3');
      fs.writeFileSync(tempFilePath, buffer);

      await interaction.editReply({ files: [tempFilePath] });

      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error('Error generating audio:', error);
      await interaction.editReply('Sorry, I had trouble generating that audio.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
