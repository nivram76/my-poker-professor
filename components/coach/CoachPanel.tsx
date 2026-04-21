import { HandReviewView } from "@/lib/hand-model";

type CoachPanelProps = {
  hand: HandReviewView;
};

const quickResponses = ["Value", "Bluff", "Protection", "Not Sure"];

export function CoachPanel({ hand }: CoachPanelProps) {
  return (
    <aside className="flex min-h-screen w-[348px] shrink-0 flex-col border-l border-white/10 bg-[#111315]">
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="text-sm font-semibold text-white">Coach</p>
        </div>
        <div className="flex rounded-xl bg-black/20 p-1">
          {["Analysis", "Chat", "Timeline"].map((tab) => (
            <button
              className={[
                "rounded-lg px-2.5 py-1 text-xs font-semibold",
                tab === "Analysis"
                  ? "bg-orange-500 text-white"
                  : "text-zinc-500 hover:text-zinc-200",
              ].join(" ")}
              key={tab}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        <section className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-5">
          <p className="text-xs font-semibold uppercase text-zinc-400">
            Optimal Play
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-white">
                {hand.optimalPlay.action}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {hand.optimalPlay.frequency} frequency
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-orange-300">
                {hand.optimalPlay.ev}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Expected Value</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase text-zinc-400">
            Explanation
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            This spot prefers a controlled action because Hero keeps worse hands
            involved while avoiding unnecessary pot growth against stronger
            ranges. The recommended size captures value without forcing folds
            from marginal holdings.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-zinc-400">
                Equity Position
              </p>
              <p className="mt-3 text-3xl font-bold text-white">
                {hand.optimalPlay.equity}
              </p>
            </div>
            <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-300">
              Marginal
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 w-[42%] rounded-full bg-orange-500" />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase text-zinc-400">
            Quick Response
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickResponses.map((response) => (
              <button
                className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/[0.05]"
                key={response}
                type="button"
              >
                {response}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-white/10 p-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase text-zinc-500">
            Ask about this decision
          </span>
          <input
            className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500/60"
            placeholder="Add your read..."
          />
        </label>
        <button
          className="mt-3 h-10 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-400"
          type="button"
        >
          Submit
        </button>
      </div>
    </aside>
  );
}
