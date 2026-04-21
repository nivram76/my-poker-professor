import { ReviewHand } from "./hand-model";

const storageKey = "pokersense.createdHands";

export function loadCreatedHands() {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.sessionStorage.getItem(storageKey);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as ReviewHand[];
  } catch {
    return [];
  }
}

export function saveCreatedHand(hand: ReviewHand) {
  const currentHands = loadCreatedHands();
  const nextHands = [
    hand,
    ...currentHands.filter((currentHand) => currentHand.id !== hand.id),
  ];

  window.sessionStorage.setItem(storageKey, JSON.stringify(nextHands));
}

export function findCreatedHand(handId: string) {
  return loadCreatedHands().find((hand) => hand.id === handId);
}
