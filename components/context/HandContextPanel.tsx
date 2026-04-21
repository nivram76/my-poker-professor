import { PokerHand } from "@/lib/mockData";

type HandContextPanelProps = {
  hand: PokerHand;
};

const contextRows = [
  ["Stakes", "stakes"],
  ["Table size", "tableSize"],
  ["Hero position", "heroPosition"],
  ["Effective stack", "effectiveStack"],
] as const;

export function HandContextPanel({ hand }: HandContextPanelProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Hand context
        </h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {contextRows.map(([label, key]) => (
            <div
              className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              key={key}
            >
              <dt className="text-xs text-zinc-500 dark:text-zinc-500">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {hand[key]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Notes
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {hand.notes}
        </p>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Raw hand history
        </h2>
        <p className="mt-3 whitespace-pre-wrap rounded-md bg-zinc-50 p-3 font-mono text-xs leading-6 text-zinc-700 dark:bg-black dark:text-zinc-300">
          {hand.rawHistory}
        </p>
      </section>
    </div>
  );
}
