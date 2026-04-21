type QuickResponseChipsProps = {
  onSelect: (value: string) => void;
};

const chips = ["Value bet", "Bluff", "Protection", "Pot control", "Not sure"];

export function QuickResponseChips({ onSelect }: QuickResponseChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          className="h-9 rounded-md border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
          key={chip}
          onClick={() => onSelect(chip)}
          type="button"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
