# Visa Component Suggestion Tool	

## Overview
A simple React app that allows developers to describe a UI and receive relevant Visa Product Design System components (stubbed) and auto-generated code snippets.

## ⚙️ Tech Stack

| Layer       | Tech |
| ------------ | ---- |
| Frontend     | React, TailwindCSS |
| Backend      | Node.js, Express.js |
| Live Preview | Raw HTML rendering with `dangerouslySetInnerHTML` |

## Features
- Free-form description input
- Suggested Visa components with descriptions
- Auto-generated code snippet area
- Copy to clipboard
- Nova theme customization
- Accessible UI (WCAG 2.1 AA)

## AI Usage
 I used ChatGPT to:
- Draft basic architecture 
- Refine filtering logic
- Improve README structure
All logic and coding decisions were self-directed, with AI used as a pair-programmer reference.

## Next Steps (If More Time):
- create an API.
- use AI. I didn't go for this and first option due to time constraints (3-4hrs only)
- VSCode extension prototype
- Favorite queries/snippet saving

## Deployment
Vercel Deployment Link
https://component-suggestion-tool-d9e4.vercel.app/


## Example Prompts 
TextField (keywords: text, input, email, password):
-	“Input field to enter email address with validation”
-	“Password input field with show/hide option”
-	Button (keywords: button, submit, click):
-	“Submit button for a login form”
-	“Primary action button for form submission”
-	“Clickable button to add an item to cart”
-	“Secondary button for cancel action”
-	Checkbox (keywords: checkbox, remember, check):
-	“Remember me checkbox below login form”
-	“Terms and conditions agreement checkbox”
-	“Newsletter subscription checkbox in signup form”
-	“Multiple option checkbox list”
-	Form (keywords: form, login, signup, register):
-	“Complete signup form with email, password, and agreement checkbox”
-	“Responsive login form with email, password and submit button”
-	“Register form with first name, last name, and submit button”
-	“Basic contact form with text inputs and a submit button”


Note: The Visa Product Design System is not publicly accessible via web scraping and returns empty content in automated environments. Therefore, I created a mock dataset of representative components for this project to demonstrate the agentic suggestion flow.
