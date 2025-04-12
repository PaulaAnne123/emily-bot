const express = require('express');
const { verifyKey } = require('discord-interactions');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.raw({ type: 'application/json' }));

app.post('/api/interactions', (req, res) => {
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const body = req.body;

  const isValidRequest = verifyKey(body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);

  if (!isValidRequest) {
    console.log('Invalid request signature');
    return res.status(401).send('Invalid request signature');
  }

  const interaction = JSON.parse(body.toString());

  if (interaction.type === 1) {
    console.log('Received PING explicitly from Discord');
    res.set('Content-Type', 'application/json');
    return res.status(200).json({ type: 1 });
  }

  console.log('Unhandled interaction explicitly');
  return res.status(400).send('Unhandled interaction type');
});

app.listen(PORT, () => {
  console.log(`Emily bot explicitly running on port ${PORT}`);
});
