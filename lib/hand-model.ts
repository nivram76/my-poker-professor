export type StreetId = "preflop" | "flop" | "turn" | "river";

export type PlayerActionType =
  | "check"
  | "call"
  | "fold"
  | "bet"
  | "raise";

export type FormActionType = PlayerActionType | "none";

export type PositionAction = {
  action: FormActionType;
  amount: string;
};

export type StreetActionMap = Record<StreetId, Record<string, PositionAction>>;

export type HandAction = {
  id: string;
  street: StreetId;
  position: string;
  action: PlayerActionType;
  amount?: string;
};

export type HandReviewView = {
  id: string;
  name: string;
  summary: string;
  result: string;
  heroPosition?: string;
  heroCards: string[];
  board: string[];
  pot: string;
  notes?: string;
  actions?: HandAction[];
  optimalPlay: {
    action: string;
    frequency: string;
    ev: string;
    equity: string;
  };
};

export type ReviewHand = HandReviewView & {
  heroPosition: string;
  notes: string;
  actions: HandAction[];
};

export type CreateHandDraft = {
  heroPosition: string;
  heroCards: {
    first: string;
    second: string;
  };
  board: {
    flop: string;
    turn: string;
    river: string;
  };
  actionsByStreet: StreetActionMap;
  notes: string;
  positions: string[];
};

export const streetOrder: Array<{ id: StreetId; label: string }> = [
  { id: "preflop", label: "Preflop" },
  { id: "flop", label: "Flop" },
  { id: "turn", label: "Turn" },
  { id: "river", label: "River" },
];

export function parseCards(value: string) {
  return value
    .split(/[,\s]+/)
    .map((card) => card.trim())
    .filter(Boolean);
}

export function createReviewHandFromDraft(draft: CreateHandDraft): ReviewHand {
  const actions: HandAction[] = [];
  const foldedPositions = new Set<string>();

  for (const street of streetOrder) {
    for (const position of draft.positions) {
      if (foldedPositions.has(position)) {
        continue;
      }

      const row = draft.actionsByStreet[street.id][position];

      if (!row || row.action === "none") {
        continue;
      }

      actions.push({
        id: `${street.id}-${position}-${actions.length + 1}`,
        street: street.id,
        position,
        action: row.action,
        amount: row.amount.trim() || undefined,
      });

      if (row.action === "fold") {
        foldedPositions.add(position);
      }
    }
  }

  const heroCards = [draft.heroCards.first, draft.heroCards.second]
    .map((card) => card.trim())
    .filter(Boolean);
  const flopCards = parseCards(draft.board.flop);
  const board = [
    flopCards[0] ?? "?",
    flopCards[1] ?? "?",
    flopCards[2] ?? "?",
    draft.board.turn.trim() || "?",
    draft.board.river.trim() || "?",
  ];
  const firstAction = actions[0];
  const name = `${heroCards.join(" ") || "New hand"} from ${draft.heroPosition}`;

  return {
    id: `created-${Date.now()}`,
    name,
    summary: firstAction
      ? `${firstAction.position} ${firstAction.action}${firstAction.amount ? ` ${firstAction.amount}` : ""}`
      : "New structured hand",
    result: "Created",
    heroPosition: draft.heroPosition,
    heroCards: heroCards.length ? heroCards : ["?", "?"],
    board,
    pot: "Pending",
    notes: draft.notes,
    actions,
    optimalPlay: {
      action: "Review",
      frequency: "0.0%",
      ev: "Pending",
      equity: "Pending",
    },
  };
}
