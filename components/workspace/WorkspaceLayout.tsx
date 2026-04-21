"use client";

import { useState } from "react";
import { MockSession } from "@/lib/mock-data";
import { HandReviewView } from "@/lib/hand-model";

type WorkspaceLayoutProps = {
  session: MockSession;
  hand: HandReviewView;
  canGoNextHand: boolean;
  canGoPreviousHand: boolean;
  onNextHand: () => void;
  onPreviousHand: () => void;
};

const replaySteps = ["Preflop", "Flop", "Turn", "River", "Summary"];

function Card({ value }: { value: string }) {
  const isHidden = value === "?";

  return (
    <span
      className={[
        "flex h-[52px] w-10 items-center justify-center rounded-xl border text-sm font-bold shadow-lg",
        isHidden
          ? "border-white/15 bg-white/10 text-zinc-400"
          : "border-white/20 bg-zinc-100 text-zinc-950",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

export function WorkspaceLayout({
  session,
  hand,
  canGoNextHand,
  canGoPreviousHand,
  onNextHand,
  onPreviousHand,
}: WorkspaceLayoutProps) {
  const [replayIndex, setReplayIndex] = useState(0);
  const hasActions = Boolean(hand.actions?.length);
  const currentAction = hand.actions?.[replayIndex];
  const currentStep = currentAction
    ? currentAction.street.charAt(0).toUpperCase() + currentAction.street.slice(1)
    : replaySteps[replayIndex];

  function goBackward() {
    setReplayIndex((index) => Math.max(0, index - 1));
  }

  function goForward() {
    const maxIndex = hasActions
      ? (hand.actions?.length ?? 1) - 1
      : replaySteps.length - 1;

    setReplayIndex((index) => Math.min(maxIndex, index + 1));
  }

  function restartReplay() {
    setReplayIndex(0);
  }

  return (
    <section className="flex min-h-screen min-w-0 flex-1 flex-col bg-[#0a0a0b]">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="font-semibold text-zinc-500">Home</span>
          <span className="text-zinc-700">/</span>
          <span className="truncate font-semibold text-zinc-100">
            {session.name}
          </span>
          <span className="hidden text-zinc-600 sm:inline">-</span>
          <span className="hidden truncate text-zinc-500 sm:inline">
            {session.date}
          </span>
        </div>
        <button
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-white/[0.06]"
          type="button"
        >
          Session Overview
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-8 py-5">
        <div className="mb-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-950">
                {hand.heroCards.join(" ")}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300">
                {hand.pot}
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                VPIP
              </span>
            </div>
            <h1 className="truncate text-base font-semibold text-zinc-100">
              {hand.summary}
            </h1>
          </div>
          <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-right">
            <p className="text-xs text-zinc-500">Current street</p>
            <p className="mt-1 text-sm font-semibold text-orange-300">
              {currentStep}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#181a1d] px-5 py-3 text-center shadow-xl">
              <p className="text-xs font-semibold text-zinc-500">SB</p>
              <p className="text-sm font-bold text-zinc-100">10.4 BB</p>
            </div>

            <div className="mx-auto flex aspect-[2.4/1] max-w-4xl items-center justify-center rounded-[999px] border border-emerald-400/20 bg-emerald-600 shadow-[0_0_90px_rgba(34,197,94,0.12)]">
              <div className="space-y-5 text-center">
                <div className="flex justify-center gap-2">
                  {hand.board.map((card, index) => (
                    <Card key={`${card}-${index}`} value={card} />
                  ))}
                </div>
                <div className="inline-flex rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm font-semibold text-white">
                  Pot: {hand.pot}
                </div>
                <div className="flex justify-center gap-2">
                  {hand.heroCards.map((card) => (
                    <Card key={card} value={card} />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-8 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#181a1d] px-5 py-3 text-center shadow-xl">
              <p className="text-xs font-semibold text-orange-300">Hero</p>
              <p className="text-sm font-bold text-zinc-100">54.2 BB</p>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#181a1d] px-5 py-3 text-center shadow-xl">
              <p className="text-xs font-semibold text-zinc-500">UTG+1</p>
              <p className="text-sm font-bold text-zinc-100">63.0 BB</p>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#181a1d] px-5 py-3 text-center shadow-xl">
              <p className="text-xs font-semibold text-zinc-500">BB</p>
              <p className="text-sm font-bold text-zinc-100">45.9 BB</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 w-full max-w-3xl rounded-2xl border border-white/10 bg-[#111315] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-orange-300">
            <span>{currentStep}</span>
            <span className="text-zinc-600">-</span>
            <span className="text-emerald-400">Solver: Check</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {currentAction
              ? `${currentAction.position} ${currentAction.action}${currentAction.amount ? ` ${currentAction.amount}` : ""}`
              : "This placeholder hand note mirrors the Railbird-style decision card. The full action engine will replace this once replay logic is added."}
          </p>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#111315] px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canGoPreviousHand}
              onClick={onPreviousHand}
              type="button"
            >
              Prev hand
            </button>
            <button
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.05]"
              onClick={goBackward}
              type="button"
            >
              Back
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.05]"
              onClick={restartReplay}
              type="button"
            >
              Restart
            </button>
            <button
              className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-400"
              onClick={goForward}
              type="button"
            >
              Replay
            </button>
            <button
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.05]"
              onClick={goForward}
              type="button"
            >
              Forward
            </button>
            <button
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canGoNextHand}
              onClick={onNextHand}
              type="button"
            >
              Next hand
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
