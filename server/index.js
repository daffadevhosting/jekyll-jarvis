const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const GPT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      GPT_ENDPOINT,
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {
  console.log('🧠 AI server berjalan di http://localhost:3000');
});
