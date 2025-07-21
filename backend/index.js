import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import 'dotenv/config';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load mock data
const components = JSON.parse(fs.readFileSync('../mockData/components.json', 'utf-8'));

app.get('/api/components', (req, res) => {
  res.json(components);
  console.log(components, '<---- components')
});


app.post('/api/suggest', async (req, res) => {
  // ✅ Extract 'input' from request body
  const { input } = req.body;

  // ✅ Handle missing input error with 400 Bad Request
  if (!input) {
    return res.status(400).json({ error: 'Missing "input" field in request body' });
  }

  try {
    // ✅ Send chat completion request to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        // ✅ System prompt to set behavior of the AI
        {
          role: 'system',
          content:
            'You are a helpful assistant that suggests Visa UI component names based on user descriptions. Your responses should be concise and practical for developers selecting UI components. Tell a user something unique about these components, and give an example REACT code snippet.',
        },
        // ✅ User prompt dynamically injects the input from frontend
        {
          role: 'user',
          content: `Given this UI description: "${input}", recommend the most relevant Visa UI components. Respond with a comma-separated list of component names and example REACT code snippets and unique something about the components only, without extra text.`,
        },
      ],
    });

    // ✅ Extract AI-generated suggestion from response
    const suggestion = completion.choices[0]?.message?.content?.trim();

    // ✅ Log AI response to server console for debugging
    console.log('✅ OpenAI Component Suggestion:', suggestion);

    // ✅ Return suggestion to the frontend as JSON
    res.json({ suggestion });
  } catch (err) {
    // ✅ Handle and log OpenAI API errors gracefully
    console.error('❌ OpenAI API error:', err.message);
    res.status(500).json({ error: 'Failed to generate component suggestions from OpenAI' });
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Visa Component Backend API is running ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Mock API running on http://localhost:${PORT}/api/components`);
});