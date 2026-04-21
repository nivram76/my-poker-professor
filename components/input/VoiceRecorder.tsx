export function VoiceRecorder() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-black/20 px-5 py-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
          <path d="M19 11a7 7 0 0 1-14 0" />
          <path d="M12 18v3" />
          <path d="M8 21h8" />
        </svg>
      </div>
      <h2 className="mt-4 text-base font-semibold text-zinc-50">
        Voice input is coming soon
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
        Voice capture is reserved for a later pass. For now, structured manual
        entry keeps every street and action reviewable.
      </p>
    </div>
  );
}
