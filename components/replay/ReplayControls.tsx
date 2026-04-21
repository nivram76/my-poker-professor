import { Street } from "@/lib/mockData";

type ReplayControlsProps = {
  canGoNext: boolean;
  canGoPrevious: boolean;
  onGoNext: () => void;
  onGoPrevious: () => void;
  onJumpToStreet: (street: Street) => void;
};

const streetJumps: Exclude<Street, "Summary">[] = [
  "Preflop",
  "Flop",
  "Turn",
  "River",
];

export function ReplayControls({
  canGoNext,
  canGoPrevious,
  onGoNext,
  onGoPrevious,
  onJumpToStreet,
}: ReplayControlsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        <button
          className="h-10 rounded-md border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          disabled={!canGoPrevious}
          onClick={onGoPrevious}
          type="button"
        >
          Previous action
        </button>
        <button
          className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          disabled={!canGoNext}
          onClick={onGoNext}
          type="button"
        >
          Next action
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {streetJumps.map((street) => (
          <button
            className="h-9 rounded-md border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
            key={street}
            onClick={() => onJumpToStreet(street)}
            type="button"
          >
            {street}
          </button>
        ))}
      </div>
    </div>
  );
}
