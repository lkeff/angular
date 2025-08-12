import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'generate',
    description: 'Generates an audio clip from text.',
    options: [
      {
        name: 'text',
        type: 3, // STRING
        description: 'The text to generate audio from.',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
