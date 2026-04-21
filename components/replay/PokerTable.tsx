import { PokerHand, Street } from "@/lib/mockData";
import { BoardDisplay } from "./BoardDisplay";

type PokerTableProps = {
  hand: PokerHand;
  currentStreet: Street;
  pot: string;
};

function Card({ value }: { value: string }) {
  return (
    <span className="flex h-16 w-11 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-bold text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50">
      {value}
    </span>
  );
}

export function PokerTable({ hand, currentStreet, pot }: PokerTableProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {hand.label}
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            {hand.stakes} · Hero {hand.heroPosition}
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 px-3 py-2 text-right dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">Pot</p>
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{pot}</p>
        </div>
      </div>

      <div className="relative mx-auto flex aspect-[16/9] min-h-72 max-w-3xl items-center justify-center rounded-[50%] border border-emerald-700/30 bg-emerald-900 shadow-inner dark:border-emerald-400/20">
        <div className="absolute inset-4 rounded-[50%] border border-white/10" />

        <div className="z-10 space-y-5 text-center">
          <BoardDisplay board={hand.board} currentStreet={currentStreet} />
          <div className="flex justify-center gap-2">
            {hand.heroCards.map((card) => (
              <Card key={card} value={card} />
            ))}
          </div>
          <p className="text-xs font-semibold uppercase text-emerald-100">
            Hero cards
          </p>
        </div>

        {hand.positions.map((position, index) => {
          const spots = [
            "left-[8%] top-[46%]",
            "left-[23%] top-[12%]",
            "right-[23%] top-[12%]",
            "right-[8%] top-[46%]",
            "right-[27%] bottom-[10%]",
            "left-[27%] bottom-[10%]",
          ];

          return (
            <div
              className={[
                "absolute rounded-md border px-3 py-2 text-center shadow-sm",
                spots[index % spots.length],
                position.isHero
                  ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                  : "border-zinc-200 bg-white text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50",
              ].join(" ")}
              key={`${position.seat}-${position.label}`}
            >
              <p className="text-xs font-bold">{position.seat}</p>
              <p className="mt-1 text-xs">{position.label}</p>
              <p className="mt-1 text-xs text-zinc-500">{position.stack}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
