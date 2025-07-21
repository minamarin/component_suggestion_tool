import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// const validComponents = Object.keys(VisaComponents);

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load mock data
const components = JSON.parse(
  fs.readFileSync('../mockData/components.json', 'utf-8')
);
// console.log(fs.existsSync('../mockData/components.json')); // should print true

// const rawData = fs.readFileSync('../mockData/components.json', 'utf-8');
// console.log('✅ Raw data:', rawData);
// JSON.parse(rawData); // Does this crash?

app.get('/api/components', (req, res) => {
  res.json(components);
  // console.log(components, '<---- components')
});

app.post('/api/suggest', async (req, res) => {
  // ✅ Extract 'input' from request body
  const { input } = req.body;

  // ✅ Handle missing input error with 400 Bad Request
  if (!input) {
    return res
      .status(400)
      .json({ error: 'Missing "input" field in request body' });
  }

  try {
    // ✅ Send chat completion request to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that returns the most relevant Visa UI component based on the UI description. 
Your response MUST be a valid JSON object in this exact format:
{
  "componentName": "<component name>",
  "componentCode": "<JSX code snippet>"
}
Do NOT include import statements, explanations, or any extra text. IF THERE ARE MORE THAN ONE SUGGESTED COMPONENTS, LIST THEM IN RELEVANT ORDER.`,
        },
        {
          role: 'user',
          content: `Given this UI description: "${input}", suggest the most appropriate Visa UI component.`,
        },
      ],
    });

    // ✅ Extract AI-generated suggestion from response
    const suggestion = completion.choices[0]?.message?.content?.trim();

    // ✅ Log AI response to server console for debugging
    console.log('✅ OpenAI Component Suggestion:', suggestion);

    // Try to parse the suggestion as JSON
    try {
      const parsed = JSON.parse(suggestion);
      if (parsed.componentName && parsed.componentCode) {
        res.json({
          componentName: parsed.componentName,
          componentCode: parsed.componentCode,
        });
        return;
      }
    } catch (e) {
      // fallback below
    }

    // Fallback: try to extract code block and name manually
    let componentName = 'Component';
    let componentCode = '';
    const nameMatch = suggestion.match(/"componentName"\s*:\s*"([^"]+)"/);
    if (nameMatch) componentName = nameMatch[1];
    const codeMatch = suggestion.match(/"componentCode"\s*:\s*"([\s\S]+)"/);
    if (codeMatch) componentCode = codeMatch[1];
    else {
      // Try to extract code from code block
      const codeBlock = suggestion.match(/```[a-z]*([\s\S]*?)```/);
      if (codeBlock) componentCode = codeBlock[1].trim();
      else componentCode = suggestion;
    }
    res.json({ componentName, componentCode });
  } catch (err) {
    // ✅ Handle and log OpenAI API errors gracefully
    console.error('❌ OpenAI API error:', err.message);
    res
      .status(500)
      .json({ error: 'Failed to generate component suggestions from OpenAI' });
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Visa Component Backend API is running ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Mock API running on http://localhost:${PORT}/api/components`);
});
