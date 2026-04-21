type TextHandInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TextHandInput({ value, onChange }: TextHandInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Hand history
      </span>
      <textarea
        className="mt-3 min-h-64 w-full resize-y rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base leading-7 text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the full hand history here. Example: Hero BTN A♠ K♠. CO opens $9, Hero 3-bets $30..."
        value={value}
      />
    </label>
  );
}
