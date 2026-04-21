# PokerSense AI Development Guide

## Core Product

PokerSense is a Railbird-inspired poker hand review workspace.

This is NOT a chatbot.
This is a structured analysis and replay tool.

---

## Layout Architecture (Critical)

The app uses a Railbird-style workspace:

- Thin global rail on the far left for high-level navigation.
- Secondary left panel that can switch between:
  - General navigation such as Home, Total Session View, and Saved Hands.
  - A specific session view with expandable sessions and clickable hands.
- Center workspace for hand replay and hand-level controls.
- Persistent right coach panel for analysis.

The root page should assemble components and own only minimal selected hand/session state. Keep large UI logic inside reusable components.

---

## Left Navigation

The left side has two purposes:

- Global navigation: Home, total session view, saved hands, and future account-level destinations.
- Session navigation: selected session context, expandable sessions, and hand-to-hand navigation.

Rules:

- Sessions contain multiple hands.
- Sessions are expandable and collapsible.
- Clicking a hand loads it into the workspace.
- The selected hand must be visually distinct.
- This area is navigation, not analysis content.

---

## Center Workspace

The center workspace should resemble a poker replay surface:

- Top breadcrumb/header with current session and hand context.
- Poker table visualization in the middle.
- Board cards, hero cards, pot, and simple seat labels.
- Decision or action summary card below the table.
- Full replay control bar at the bottom.

Replay controls must include:

- Previous hand
- Backward action/street
- Restart/replay
- Forward action/street
- Next hand
- Future street jump controls when the full replay engine is added

---

## Coach Panel

The right panel is always visible on desktop.

It should contain structured analysis, not chatbot messages:

- Coach title and analysis context
- Optimal play card
- Explanation
- Equity or EV highlights
- Quick response buttons
- Input field for the user's read or question

Do NOT implement coach personalities in V1.

---

## Routing

- `/` -> workspace
- `/create` -> create hand

Do not create separate review or summary routes for V1.

---

## Design Philosophy

- Dark Railbird-inspired workspace
- Soft borders and rounded panels
- Minimal clutter
- Strong hierarchy
- Use spacing and subtle contrast instead of heavy colors
- Use Tailwind CSS only

---

## Code Rules

- Use TypeScript.
- Use Tailwind.
- Keep components small.
- Do NOT put large UI logic in `app/page.tsx`.
- Use mock data only until backend work begins.
- Do NOT build backend logic yet.
