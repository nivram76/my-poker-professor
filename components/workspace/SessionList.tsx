import { ReviewSession } from "@/lib/mockData";
import { HandList } from "./HandList";

type SessionListProps = {
  expandedSessionIds: string[];
  selectedHandId: string;
  selectedSessionId: string;
  sessions: ReviewSession[];
  onSelectHand: (sessionId: string, handId: string) => void;
  onToggleSession: (sessionId: string) => void;
};

export function SessionList({
  expandedSessionIds,
  selectedHandId,
  selectedSessionId,
  sessions,
  onSelectHand,
  onToggleSession,
}: SessionListProps) {
  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const isExpanded = expandedSessionIds.includes(session.id);
        const containsSelectedHand = session.id === selectedSessionId;

        return (
          <section
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            key={session.id}
          >
            <button
              className="flex w-full items-center justify-between px-3 py-3 text-left"
              onClick={() => onToggleSession(session.id)}
              type="button"
            >
              <span>
                <span className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {session.name}
                </span>
                <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-500">
                  {session.date} · {session.hands.length} hands
                </span>
              </span>
              <span
                aria-hidden="true"
                className={[
                  "text-sm text-zinc-500 transition-transform",
                  isExpanded ? "rotate-90" : "",
                  containsSelectedHand ? "text-emerald-600 dark:text-emerald-300" : "",
                ].join(" ")}
              >
                ›
              </span>
            </button>

            {isExpanded ? (
              <HandList
                hands={session.hands}
                onSelectHand={(handId) => onSelectHand(session.id, handId)}
                selectedHandId={selectedHandId}
              />
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
