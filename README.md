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

## Key Technical Decisions
💠 Frontend Decisions
###Component Scope Control:
I made a conscious choice to scope the react-live component preview strictly to the @visa/nova-react library. This prevented runtime errors from undefined or unsafe components and ensured that live previews stayed accurate and secure within the Nova design system context.
### Live Preview Rendering Strategy:
For rendering AI-suggested JSX, I opted for react-live instead of dangerouslySetInnerHTML. This allowed me to safely execute and render actual React components in real-time, maintaining interactivity while avoiding XSS vulnerabilities and the limitations of raw HTML rendering.
### Safe AI Code Injection:
I enforced a structured JSON response format from OpenAI (with componentName and componentCode fields). This made it easier to parse, render, and debug AI outputs while minimizing hallucinations and formatting errors in the live preview.
### User Experience Improvements:
To make the experience developer-friendly, I added:
- A clickable Visa logo that resets the entire session state and clears the suggestion history.
- Typewriter animations to rotate placeholder prompts, making the input field more interactive and less static.
- Copy-to-clipboard functionality via the VisaCopyLow icon for instant code reuse.

💠 Backend Decisions
- Backend-Orchestrated AI Calls:
I chose to handle OpenAI API calls on the backend (Node.js Express) to protect sensitive API keys and to validate AI responses before exposing them to the frontend. This architecture also gave me flexibility for future enhancements like caching or request throttling.
- Mock Dataset Integration:
Given that the real Visa PDS components are behind internal access walls, I created a mock dataset (components.json) to replicate realistic component suggestions. This allowed me to demonstrate both keyword matching and AI-driven suggestions without scraping or unauthorized access.
- Validation Strategy for AI Output:
I designed the system to optionally validate AI-suggested components against my known mock dataset before rendering. While basic checks were implemented, I noted this as an area for future development, especially for enterprise use cases where hallucination prevention is critical.

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
-	“Password input field with show/hide option” → causes preview error on purpose in AI suggest mode
### Button (keywords: button, submit, click):
-	“Clickable button to add an item to cart” → live preview available in AI suggest mode
### Checkbox (keywords: checkbox, remember, check):
-	“Remember me checkbox below login form” →　live preview available in AI suggest mode
### IF IN CASE OF ABNORMAL SITUATION (Edge Cases): 
- Text input over 500 words → Alert: word count exceeded
- Too many components →　scrollable 


