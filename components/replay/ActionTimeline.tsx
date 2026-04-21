import { HandAction } from "@/lib/mockData";

type ActionTimelineProps = {
  actions: HandAction[];
  currentActionIndex: number;
  onSelectAction: (index: number) => void;
};

export function ActionTimeline({
  actions,
  currentActionIndex,
  onSelectAction,
}: ActionTimelineProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          Action timeline
        </h2>
      </div>
      <div className="max-h-72 overflow-y-auto p-2">
        {actions.map((action, index) => {
          const isCurrent = index === currentActionIndex;

          return (
            <button
              className={[
                "grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition",
                isCurrent
                  ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
              ].join(" ")}
              key={action.id}
              onClick={() => onSelectAction(index)}
              type="button"
            >
              <span className="text-xs font-semibold">{action.street}</span>
              <span>
                <span className="font-semibold">{action.actor}</span>{" "}
                {action.action}
                {action.amount ? ` ${action.amount}` : ""}
              </span>
              <span className="text-xs text-zinc-500">{action.pot}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
