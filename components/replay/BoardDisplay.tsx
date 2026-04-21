import { PokerHand, Street } from "@/lib/mockData";

type BoardDisplayProps = {
  board: PokerHand["board"];
  currentStreet: Street;
};

function Card({ value, muted = false }: { value: string; muted?: boolean }) {
  return (
    <span
      className={[
        "flex h-14 w-10 items-center justify-center rounded-md border text-sm font-bold shadow-sm",
        muted
          ? "border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
          : "border-zinc-200 bg-white text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

export function BoardDisplay({ board, currentStreet }: BoardDisplayProps) {
  const visibleCards = [
    ...board.flop.map((card) => ({
      card,
      visible: currentStreet !== "Preflop",
    })),
    ...board.turn.map((card) => ({
      card,
      visible: ["Turn", "River", "Summary"].includes(currentStreet),
    })),
    ...board.river.map((card) => ({
      card,
      visible: ["River", "Summary"].includes(currentStreet),
    })),
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {visibleCards.map((item, index) => (
        <Card
          key={`${item.card}-${index}`}
          muted={!item.visible}
          value={item.visible ? item.card : "?"}
        />
      ))}
    </div>
  );
}
