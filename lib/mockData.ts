export type Street = "Preflop" | "Flop" | "Turn" | "River" | "Summary";

export type HandAction = {
  id: string;
  street: Exclude<Street, "Summary">;
  actor: string;
  action: string;
  amount?: string;
  pot: string;
};

export type PokerHand = {
  id: string;
  label: string;
  result: string;
  stakes: string;
  tableSize: string;
  heroPosition: string;
  effectiveStack: string;
  heroCards: string[];
  board: {
    flop: string[];
    turn: string[];
    river: string[];
  };
  positions: Array<{
    seat: string;
    label: string;
    stack: string;
    isHero?: boolean;
  }>;
  notes: string;
  rawHistory: string;
  actions: HandAction[];
};

export type ReviewSession = {
  id: string;
  name: string;
  date: string;
  hands: PokerHand[];
};

export const streets: Street[] = ["Preflop", "Flop", "Turn", "River", "Summary"];

export const reviewSessions: ReviewSession[] = [
  {
    id: "drafted-hands",
    name: "Drafted Hands",
    date: "Today",
    hands: [
      {
        id: "mock-created-hand",
        label: "Created Hand",
        result: "Ready",
        stakes: "$1/$3 NLHE",
        tableSize: "6-max",
        heroPosition: "Button",
        effectiveStack: "$420",
        heroCards: ["A♠", "K♠"],
        board: {
          flop: ["K♦", "8♠", "4♣"],
          turn: ["7♥"],
          river: ["2♦"],
        },
        positions: [
          { seat: "UTG", label: "Folded", stack: "$290" },
          { seat: "HJ", label: "Folded", stack: "$360" },
          { seat: "CO", label: "Villain", stack: "$390" },
          { seat: "BTN", label: "Hero", stack: "$420", isHero: true },
          { seat: "SB", label: "Folded", stack: "$210" },
          { seat: "BB", label: "Folded", stack: "$510" },
        ],
        notes:
          "Mock hand loaded after create. Replace this with persisted backend data later.",
        rawHistory:
          "Created hand mock: Hero BTN A♠ K♠. CO opens $9, Hero 3-bets $30, CO calls. Flop K♦ 8♠ 4♣. CO checks, Hero bets $35, CO calls. Turn 7♥. CO checks, Hero checks. River 2♦. CO bets $75, Hero calls.",
        actions: [
          { id: "d1", street: "Preflop", actor: "CO", action: "opens", amount: "$9", pot: "$13" },
          { id: "d2", street: "Preflop", actor: "Hero", action: "3-bets", amount: "$30", pot: "$43" },
          { id: "d3", street: "Preflop", actor: "CO", action: "calls", amount: "$21", pot: "$64" },
          { id: "d4", street: "Flop", actor: "CO", action: "checks", pot: "$64" },
          { id: "d5", street: "Flop", actor: "Hero", action: "bets", amount: "$35", pot: "$99" },
          { id: "d6", street: "Flop", actor: "CO", action: "calls", amount: "$35", pot: "$134" },
          { id: "d7", street: "Turn", actor: "CO", action: "checks", pot: "$134" },
          { id: "d8", street: "Turn", actor: "Hero", action: "checks back", pot: "$134" },
          { id: "d9", street: "River", actor: "CO", action: "bets", amount: "$75", pot: "$209" },
          { id: "d10", street: "River", actor: "Hero", action: "calls", amount: "$75", pot: "$284" },
        ],
      },
    ],
  },
  {
    id: "friday-1-3",
    name: "Friday $1/$3",
    date: "Apr 18",
    hands: [
      {
        id: "hand-001",
        label: "Hand 1",
        result: "+$78",
        stakes: "$1/$3 NLHE",
        tableSize: "6-max",
        heroPosition: "Button",
        effectiveStack: "$420",
        heroCards: ["A♠", "K♠"],
        board: {
          flop: ["K♦", "8♠", "4♣"],
          turn: ["7♥"],
          river: ["2♦"],
        },
        positions: [
          { seat: "UTG", label: "Folded", stack: "$290" },
          { seat: "HJ", label: "Folded", stack: "$360" },
          { seat: "CO", label: "Villain", stack: "$390" },
          { seat: "BTN", label: "Hero", stack: "$420", isHero: true },
          { seat: "SB", label: "Folded", stack: "$210" },
          { seat: "BB", label: "Folded", stack: "$510" },
        ],
        notes:
          "CO had been opening wide but did not seem comfortable facing larger turn bets.",
        rawHistory:
          "Hero BTN A♠ K♠. CO opens $9, Hero 3-bets $30, CO calls. Flop K♦ 8♠ 4♣. CO checks, Hero bets $35, CO calls. Turn 7♥. CO checks, Hero checks. River 2♦. CO bets $75, Hero calls.",
        actions: [
          { id: "a1", street: "Preflop", actor: "CO", action: "opens", amount: "$9", pot: "$13" },
          { id: "a2", street: "Preflop", actor: "Hero", action: "3-bets", amount: "$30", pot: "$43" },
          { id: "a3", street: "Preflop", actor: "CO", action: "calls", amount: "$21", pot: "$64" },
          { id: "a4", street: "Flop", actor: "CO", action: "checks", pot: "$64" },
          { id: "a5", street: "Flop", actor: "Hero", action: "bets", amount: "$35", pot: "$99" },
          { id: "a6", street: "Flop", actor: "CO", action: "calls", amount: "$35", pot: "$134" },
          { id: "a7", street: "Turn", actor: "CO", action: "checks", pot: "$134" },
          { id: "a8", street: "Turn", actor: "Hero", action: "checks back", pot: "$134" },
          { id: "a9", street: "River", actor: "CO", action: "bets", amount: "$75", pot: "$209" },
          { id: "a10", street: "River", actor: "Hero", action: "calls", amount: "$75", pot: "$284" },
        ],
      },
      {
        id: "hand-002",
        label: "Hand 2",
        result: "-$46",
        stakes: "$1/$3 NLHE",
        tableSize: "9-handed",
        heroPosition: "Cutoff",
        effectiveStack: "$310",
        heroCards: ["Q♥", "Q♣"],
        board: {
          flop: ["J♠", "9♣", "5♦"],
          turn: ["A♦"],
          river: ["3♣"],
        },
        positions: [
          { seat: "UTG", label: "Caller", stack: "$260" },
          { seat: "MP", label: "Folded", stack: "$500" },
          { seat: "CO", label: "Hero", stack: "$310", isHero: true },
          { seat: "BTN", label: "Villain", stack: "$360" },
          { seat: "SB", label: "Folded", stack: "$180" },
          { seat: "BB", label: "Folded", stack: "$440" },
        ],
        notes: "Good candidate to review turn discipline after scare cards.",
        rawHistory:
          "Hero CO Q♥ Q♣. UTG limps, Hero raises $15, BTN calls, UTG calls. Flop J♠ 9♣ 5♦. Checks to Hero, Hero bets $25, BTN calls. Turn A♦. Hero bets $45, BTN raises $120, Hero folds.",
        actions: [
          { id: "b1", street: "Preflop", actor: "UTG", action: "limps", amount: "$3", pot: "$7" },
          { id: "b2", street: "Preflop", actor: "Hero", action: "raises", amount: "$15", pot: "$22" },
          { id: "b3", street: "Preflop", actor: "BTN", action: "calls", amount: "$15", pot: "$37" },
          { id: "b4", street: "Preflop", actor: "UTG", action: "calls", amount: "$12", pot: "$49" },
          { id: "b5", street: "Flop", actor: "UTG", action: "checks", pot: "$49" },
          { id: "b6", street: "Flop", actor: "Hero", action: "bets", amount: "$25", pot: "$74" },
          { id: "b7", street: "Flop", actor: "BTN", action: "calls", amount: "$25", pot: "$99" },
          { id: "b8", street: "Turn", actor: "Hero", action: "bets", amount: "$45", pot: "$144" },
          { id: "b9", street: "Turn", actor: "BTN", action: "raises", amount: "$120", pot: "$264" },
          { id: "b10", street: "Turn", actor: "Hero", action: "folds", pot: "$264" },
        ],
      },
    ],
  },
  {
    id: "sunday-study",
    name: "Sunday Study",
    date: "Apr 19",
    hands: [
      {
        id: "hand-003",
        label: "Hand 1",
        result: "+$112",
        stakes: "$2/$5 NLHE",
        tableSize: "6-max",
        heroPosition: "Small Blind",
        effectiveStack: "$780",
        heroCards: ["9♠", "9♦"],
        board: {
          flop: ["9♥", "6♣", "2♠"],
          turn: ["T♣"],
          river: ["T♠"],
        },
        positions: [
          { seat: "LJ", label: "Folded", stack: "$600" },
          { seat: "HJ", label: "Folded", stack: "$840" },
          { seat: "CO", label: "Opener", stack: "$780" },
          { seat: "BTN", label: "Folded", stack: "$520" },
          { seat: "SB", label: "Hero", stack: "$780", isHero: true },
          { seat: "BB", label: "Folded", stack: "$450" },
        ],
        notes: "Review sizing plan after flopping top set out of position.",
        rawHistory:
          "Hero SB 9♠ 9♦. CO opens $15, Hero calls. Flop 9♥ 6♣ 2♠. Hero checks, CO bets $20, Hero calls. Turn T♣. Hero checks, CO bets $55, Hero raises $165, CO calls. River T♠. Hero bets $240, CO calls.",
        actions: [
          { id: "c1", street: "Preflop", actor: "CO", action: "opens", amount: "$15", pot: "$22" },
          { id: "c2", street: "Preflop", actor: "Hero", action: "calls", amount: "$13", pot: "$35" },
          { id: "c3", street: "Flop", actor: "Hero", action: "checks", pot: "$35" },
          { id: "c4", street: "Flop", actor: "CO", action: "bets", amount: "$20", pot: "$55" },
          { id: "c5", street: "Flop", actor: "Hero", action: "calls", amount: "$20", pot: "$75" },
          { id: "c6", street: "Turn", actor: "Hero", action: "checks", pot: "$75" },
          { id: "c7", street: "Turn", actor: "CO", action: "bets", amount: "$55", pot: "$130" },
          { id: "c8", street: "Turn", actor: "Hero", action: "raises", amount: "$165", pot: "$295" },
          { id: "c9", street: "Turn", actor: "CO", action: "calls", amount: "$110", pot: "$405" },
          { id: "c10", street: "River", actor: "Hero", action: "bets", amount: "$240", pot: "$645" },
          { id: "c11", street: "River", actor: "CO", action: "calls", amount: "$240", pot: "$885" },
        ],
      },
    ],
  },
];

export function findHand(sessionId: string, handId: string) {
  const session = reviewSessions.find((item) => item.id === sessionId);
  const hand = session?.hands.find((item) => item.id === handId);

  return { session, hand };
}
