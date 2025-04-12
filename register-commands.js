const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const TOKEN = process.env.DISCORD_BOT_TOKEN;

const commandData = [{
  name: 'chat',
  description: 'Chat with Emily',
  options: [{
    type: 3, // String input
    name: 'message',
    description: 'Your message to Emily',
    required: true,
  }],
}];

async function registerCommands() {
  const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${TOKEN}`,
    },
    body: JSON.stringify(commandData),
  });

  const data = await response.json();
  console.log('Registered commands:', data);
}

registerCommands().catch(console.error);
