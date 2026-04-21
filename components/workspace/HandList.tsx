import { PokerHand } from "@/lib/mockData";

type HandListProps = {
  hands: PokerHand[];
  selectedHandId: string;
  onSelectHand: (handId: string) => void;
};

export function HandList({
  hands,
  selectedHandId,
  onSelectHand,
}: HandListProps) {
  return (
    <div className="space-y-1 px-2 pb-2">
      {hands.map((hand) => {
        const isSelected = hand.id === selectedHandId;

        return (
          <button
            className={[
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition",
              isSelected
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
            ].join(" ")}
            key={hand.id}
            onClick={() => onSelectHand(hand.id)}
            type="button"
          >
            <span className="font-medium">{hand.label}</span>
            <span className={isSelected ? "text-emerald-700 dark:text-emerald-300" : ""}>
              {hand.result}
            </span>
          </button>
        );
      })}
    </div>
  );
}
