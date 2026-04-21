# PokerSense UI Spec (Railbird-inspired)

## Layout

3-column layout:

- Sidebar width: ~260px
- Center: flexible
- Right panel: ~340px
- Full height (100vh)
- Dark theme

---

## Left Sidebar

Sections:
- Sessions list
- Each session expandable
- Hands listed inside

UI:
- Minimal cards
- Active hand highlighted

---

## Center: Replay Tab

Top:
- Session title
- Hand info

Main:
- Poker table centered
- Players positioned around table
- Hero highlighted

Below table:
- Action timeline
- Current action highlighted

Bottom:
- Controls:
  - Previous
  - Next
  - Replay button
  - Street navigation

---

## Right Panel (Coach)

Top:
- Tabs (optional future)

Main:
- Suggested action (e.g. Bet 2.77)
- Explanation
- Equity % (mock)
- Tags (semi-bluff, draw, etc.)

Bottom:
- Input box
- Quick response chips

---

## Interaction Flow

1. User selects hand from sidebar
2. Hand loads in center
3. User clicks next action
4. Replay updates
5. Coach panel updates

---

## Visual Style

- Dark background (#0a0a0b)
- Soft borders
- Rounded cards
- Subtle glow / highlights
- Minimal text clutter