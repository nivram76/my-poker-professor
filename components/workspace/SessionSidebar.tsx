"use client";

import { useState } from "react";
import { MockSession } from "@/lib/mock-data";

type SessionSidebarProps = {
  sessions: MockSession[];
  selectedSessionId: string;
  selectedHandId: string;
  onSelectHand: (sessionId: string, handId: string) => void;
};

export function SessionSidebar({
  sessions,
  selectedSessionId,
  selectedHandId,
  onSelectHand,
}: SessionSidebarProps) {
  const [panelMode, setPanelMode] = useState<"session" | "nav">("session");
  const [expandedSessionIds, setExpandedSessionIds] = useState<string[]>([
    selectedSessionId,
  ]);
  const selectedSession = sessions.find((session) => session.id === selectedSessionId);

  function toggleSession(sessionId: string) {
    setExpandedSessionIds((current) =>
      current.includes(sessionId)
        ? current.filter((id) => id !== sessionId)
        : [...current, sessionId],
    );
  }

  return (
    <aside className="flex min-h-screen shrink-0 border-r border-white/10 bg-[#0f1012]">
      <nav className="flex w-12 flex-col items-center justify-between border-r border-white/10 py-3">
        <div className="space-y-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-sm font-black text-orange-400">
            P
          </div>
          <button
            aria-label="Open home navigation"
            className={[
              "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold",
              panelMode === "nav"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200",
            ].join(" ")}
            onClick={() => setPanelMode("nav")}
            type="button"
          >
            H
          </button>
          <button
            aria-label="Open session hands"
            className={[
              "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold",
              panelMode === "session"
                ? "bg-orange-500/15 text-orange-300"
                : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200",
            ].join(" ")}
            onClick={() => setPanelMode("session")}
            type="button"
          >
            S
          </button>
        </div>
        <div className="space-y-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <div className="h-2 w-2 rounded-full bg-zinc-600" />
        </div>
      </nav>

      <div className="flex w-[272px] flex-col">
        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                PokerSense
              </p>
              <p className="mt-1 truncate text-xs text-zinc-500">
                {panelMode === "session"
                  ? selectedSession?.name ?? "Session"
                  : "Navigation"}
              </p>
            </div>
            <button
              className="rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:bg-white/[0.05]"
              type="button"
            >
              Back
            </button>
          </div>
        </div>

        {panelMode === "nav" ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-2">
              {[
                ["Home", "Return to dashboard"],
                ["Total Session View", "See all sessions and results"],
                ["Saved Hands", "Review bookmarked spots"],
              ].map(([label, description]) => (
                <button
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left hover:bg-white/[0.06]"
                  key={label}
                  type="button"
                >
                  <span className="block text-sm font-semibold text-zinc-100">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
              <button
                className="rounded-lg bg-white/[0.07] px-3 py-2 text-xs font-semibold text-zinc-100"
                type="button"
              >
                Highlights
              </button>
              <button
                className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-200"
                type="button"
              >
                Hands
              </button>
            </div>

            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase text-zinc-400">
                Sessions
              </h2>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-500">
                {sessions.length}
              </span>
            </div>

            <div className="space-y-2">
              {sessions.map((session) => {
                const isExpanded = expandedSessionIds.includes(session.id);
                const isActiveSession = selectedSessionId === session.id;

                return (
                  <section
                    className="rounded-xl border border-white/10 bg-white/[0.03]"
                    key={session.id}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
                      onClick={() => toggleSession(session.id)}
                      type="button"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-zinc-100">
                          {session.name}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-500">
                          {session.date} - {session.hands.length} hands
                        </span>
                      </span>
                      <span
                        className={[
                          "text-lg leading-none text-zinc-500",
                          isExpanded ? "rotate-90" : "",
                          isActiveSession ? "text-orange-400" : "",
                        ].join(" ")}
                      >
                        &gt;
                      </span>
                    </button>

                    {isExpanded ? (
                      <div className="space-y-2 px-2 pb-2">
                        {session.hands.map((hand) => {
                          const isSelected =
                            selectedSessionId === session.id &&
                            selectedHandId === hand.id;

                          return (
                            <button
                              className={[
                                "w-full rounded-xl border px-3 py-3 text-left",
                                isSelected
                                  ? "border-orange-500/60 bg-orange-500/10"
                                  : "border-transparent bg-black/10 hover:bg-white/[0.05]",
                              ].join(" ")}
                              key={hand.id}
                              onClick={() => onSelectHand(session.id, hand.id)}
                              type="button"
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="truncate text-sm font-semibold text-zinc-100">
                                  {hand.name}
                                </span>
                                <span
                                  className={[
                                    "text-xs font-semibold",
                                    hand.result.startsWith("+")
                                      ? "text-emerald-400"
                                      : "text-zinc-500",
                                  ].join(" ")}
                                >
                                  {hand.result}
                                </span>
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-zinc-500">
                                {hand.summary}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
