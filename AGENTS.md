# PokerSense AI Development Guide

## Core Product

PokerSense is a LeetCode-style poker hand review workspace.
This is NOT a chatbot.
This is a structured analysis tool.

---

## Layout Architecture (CRITICAL)

The app uses a 3-panel layout:

- LEFT SIDEBAR (navigation)
- CENTER WORKSPACE (main content)
- RIGHT PANEL (AI coach)

---

## Sidebar (Navigation Bar)

- Sessions contain multiple hands
- Sessions are expandable
- Clicking a hand loads it into workspace
- This is navigation, not content

---

## Center Workspace

Tabs:
- Replay (default)
- Context

Replay is the PRIMARY experience.

---

## Replay UI (CORE FEATURE)

Must include:

- Poker table visualization
- Hero + positions
- Board cards
- Pot size
- Action timeline
- Current action highlight

Navigation:
- Previous action
- Next action
- Jump to street

---

## Context Tab

Contains:
- Stakes
- Position
- Stack size
- Notes
- Raw hand history

Read-only for V1

---

## Coach Panel (RIGHT SIDE)

- Always visible (desktop)
- Updates based on current action
- Contains:
  - Prompt
  - Quick responses
  - Text input
  - Feedback

Do NOT implement chatbot style UI.

---

## Routing

- `/` → workspace
- `/create` → create 

---

## Design Philosophy

- Clean, minimal (similar to Railbird / LeetCode)
- Workspace-first
- No clutter
- Strong hierarchy

---

## Code Rules

- Use TypeScript
- Use Tailwind
- Keep components small
- Do NOT put large UI logic in page.tsx
🧱 Tech Stack

Frontend:

Next.js (App Router)
TypeScript
Tailwind CSS

Backend (later, not now):

FastAPI (Python)
PostgreSQL
Redis
---
