# Visa Component Suggestion Tool	

## Overview
A full-stack web application that recommends Visa Product Design System (PDS) components based on developer prompts, leveraging both rule-based matching and OpenAI API integration for AI-powered suggestions.
Disclaimer: The official Visa PDS components are not accessible via public APIs or scraping due to authentication restrictions. For demonstration purposes, this project utilizes a curated mock dataset representing common Visa components to simulate a production-like flow.

This project showcases agentic AI-powered developer workflows in an enterprise design system context. It demonstrates practical full-stack reasoning, with an emphasis on clean code, controlled AI use, and clear separation of concerns between the frontend suggestion engine and backend AI orchestration.

## ⚙️ Tech Stack

| Layer       | Tech |
| ------------ | ---- |
| Frontend     | React, TailwindCSS, Typescript, Visa Nova Design System |
| Backend      | Node.js, Express.js, OPENAI API |
| Live Preview | Interactive JSX rendering via react-live using a scoped React environment (safe, component-aware), avoiding raw HTML injection |

## Features
- Free-form developer prompt input
- Local keyword-based matching with mock dataset
- AI-powered component suggestions with GPT-3.5 Turbo
- Live JSX preview of AI-generated code (safe, scoped)
- Component name + code snippet + live preview layout
- Copy-to-clipboard via VisaCopyLow icon
- Clickable Visa logo to reset session state
- WCAG 2.1 AA accessible UI
- Nova design system theming

## AI Usage
AI was used strictly as a pair programming assistant:
- Drafted architectural scaffolding and brainstorming flow logic	
- Assisted with prompt engineering to improve suggestion quality.
- Contributed to documentation and copywriting cleanup.

Core decisions, architecture setup, data modeling, error handling, and UI composition were engineered manually, with AI offering guidance rather than driving implementation.

## Next Steps (If More Time):
- Unit tests for backend routes with Jest/Supertest

## Deployment
Vercel Deployment Link (Frontend): 
Backend: Localhost (Node.js Express on port 4000)


## Example Prompts 
### TextField (keywords: text, input, email, password):
-	“Password input field with show/hide option” <- causes preview error on purpose in AI suggest mode
### Button (keywords: button, submit, click):
-	“Clickable button to add an item to cart” <- live preview available in AI suggest mode
### Checkbox (keywords: checkbox, remember, check):
-	“Remember me checkbox below login form” <- live preview available in AI suggest mode
### IF IN CASE OF ABNORMAL SITUATION (Edge Cases): 
- Text input over 500 words -> Alert: word count exceeded
- Too many components -> scrollable 


