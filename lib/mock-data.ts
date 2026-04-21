export type MockHand = {
  id: string;
  name: string;
  summary: string;
  result: string;
  heroCards: string[];
  board: string[];
  pot: string;
  optimalPlay: {
    action: string;
    frequency: string;
    ev: string;
    equity: string;
  };
};

export type MockSession = {
  id: string;
  name: string;
  date: string;
  hands: MockHand[];
};

export const mockSessions: MockSession[] = [
  {
    id: "bounty-hunter",
    name: "Bounty Hunters 1.08 NLHE",
    date: "Feb 14, 2025",
    hands: [
      {
        id: "kjo-defend",
        name: "Defend KJo",
        summary: "Defend KJo pre, check multiway on A-T-4, then bet small river.",
        result: "+14bb",
        heroCards: ["Kh", "Jc"],
        board: ["4s", "Ah", "Tc", "?", "?"],
        pot: "8.55 BB",
        optimalPlay: {
          action: "Bet 2.77",
          frequency: "42.5%",
          ev: "+0.00 BB",
          equity: "41.7%",
        },
      },
      {
        id: "thin-value",
        name: "Top Set, Thin Value",
        summary: "River sizing decision after turn raise gets called.",
        result: "+13bb",
        heroCards: ["Td", "Ts"],
        board: ["Th", "9c", "4s", "2d", "2c"],
        pot: "21.8 BB",
        optimalPlay: {
          action: "Bet 6.40",
          frequency: "55.0%",
          ev: "+0.18 BB",
          equity: "68.2%",
        },
      },
      {
        id: "fold-squeeze",
        name: "Fold A6s To Squeeze",
        summary: "Button open faces blind squeeze with shallow stacks.",
        result: "-2bb",
        heroCards: ["Ah", "6h"],
        board: ["?", "?", "?", "?", "?"],
        pot: "7.2 BB",
        optimalPlay: {
          action: "Fold",
          frequency: "71.3%",
          ev: "+0.04 BB",
          equity: "34.9%",
        },
      },
    ],
  },
  {
    id: "friday-live",
    name: "Friday $1/$3 Live",
    date: "Apr 18, 2026",
    hands: [
      {
        id: "aks-threebet",
        name: "AKs 3-Bet Pot",
        summary: "Button 3-bets CO and navigates top pair across three streets.",
        result: "+$78",
        heroCards: ["As", "Ks"],
        board: ["Kd", "8s", "4c", "7h", "2d"],
        pot: "$284",
        optimalPlay: {
          action: "Bet 42",
          frequency: "49.6%",
          ev: "+$6.20",
          equity: "57.8%",
        },
      },
      {
        id: "qq-ace-turn",
        name: "QQ On Ace Turn",
        summary: "Continuation bet gets raised after a scare card arrives.",
        result: "-$46",
        heroCards: ["Qh", "Qc"],
        board: ["Js", "9c", "5d", "Ad", "?"],
        pot: "$264",
        optimalPlay: {
          action: "Check",
          frequency: "63.8%",
          ev: "+$2.10",
          equity: "38.4%",
        },
      },
    ],
  },
];

export function getSessionById(sessionId: string) {
  return mockSessions.find((session) => session.id === sessionId);
}

export function getHandById(sessionId: string, handId: string) {
  const session = getSessionById(sessionId);
  const hand = session?.hands.find((item) => item.id === handId);

  return { session, hand };
}
