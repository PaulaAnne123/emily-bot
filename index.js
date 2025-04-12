const express = require('express');
const { verifyKey, InteractionType, InteractionResponseType } = require('discord-interactions');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.raw({ type: 'application/json' }));

app.post('/api/interactions', async (req, res) => {
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const body = req.body;

  if (!verifyKey(body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY)) {
    return res.status(401).send('Bad request signature');
  }

  const interaction = JSON.parse(body.toString());

  if (interaction.type === InteractionType.PING) {
    return res.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const userPrompt = interaction.data.options[0].value;

    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: userPrompt }],
    });

    const reply = gptResponse.choices[0].message.content;

    return res.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: reply },
    });
  }

  return res.status(400).send('Unhandled Interaction');
});

app.listen(PORT, () => {
  console.log(`Discord GPT bot explicitly running on port ${PORT}`);
});
