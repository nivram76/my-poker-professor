export type InputMode = "structured" | "voice";

type InputModeToggleProps = {
  value: InputMode;
  onChange: (mode: InputMode) => void;
};

const modes: Array<{ value: InputMode; label: string }> = [
  { value: "structured", label: "Structured Manual Input" },
  { value: "voice", label: "Voice Input" },
];

export function InputModeToggle({ value, onChange }: InputModeToggleProps) {
  return (
    <div
      aria-label="Hand input mode"
      className="grid grid-cols-1 rounded-xl border border-white/10 bg-black/30 p-1 sm:grid-cols-2"
      role="group"
    >
      {modes.map((mode) => {
        const isSelected = value === mode.value;

        return (
          <button
            aria-pressed={isSelected}
            className={[
              "h-10 rounded-lg px-4 text-sm font-semibold transition-colors",
              isSelected
                ? "bg-orange-500 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-200",
            ].join(" ")}
            key={mode.value}
            onClick={() => onChange(mode.value)}
            type="button"
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
