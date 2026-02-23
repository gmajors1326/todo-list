# Tri-Level Talk-To-Do

A high-productivity task manager with natural language triage and a chat-first interface.

## Features
- **3-Level Priority**: High, Medium, and Low.
- **Natural Language Input**: Type thoughts like "Call customer tomorrow 10am" and the app auto-triages priority, category, and due date.
- **Daily Focus**: "Today" view with Top 3 outcomes logic.
- **Guided Reviews**: Morning, Midday, and Evening review flows to keep you on track.
- **Keyboard Powered**:
  - `N` or `/` : Focus chat/new task
  - `T` : Jump to Today view
- **Voice-Ready**: UI includes a microphone button (stubbed for integration with Web Speech API).
- **Export/Import**: Local persistence with JSON export/import support.

## Tech Stack
- React + TypeScript + Vite
- Vanilla CSS (Premium Glassmorphism Design)
- Lucide React (Icons)
- Framer Motion (Animations)
- Chrono-node (NLP Date Parsing)

## Setup & Running
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## How to Extend with LLM
To replace the deterministic intent parser with an LLM (e.g., OpenAI):
1. Create an adapter in `src/utils/nlp.ts`.
2. Replace `parseIntent` and `triageTask` with async calls to your backend or an edge function that calls OpenAI.
3. Pass the transcribed text from the Web Speech API directly to the chat handler.

## Auto-Triage Rules
- **High**: Keywords like "today", "asap", "urgent", "customer", "invoice" or dates within 48 hours.
- **Medium**: Keywords like "plan", "research", "build", "brainstorm".
- **Low**: Keywords like "someday", "maybe", "idea".
- **Limit Guardrail**: A warning appears if more than 7 tasks are set to High priority.
