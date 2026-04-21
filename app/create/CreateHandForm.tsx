"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputMode,
  InputModeToggle,
} from "@/components/input/InputModeToggle";
import { VoiceRecorder } from "@/components/input/VoiceRecorder";
import {
  createReviewHandFromDraft,
  FormActionType,
  PositionAction,
  StreetActionMap,
  StreetId,
} from "@/lib/hand-model";
import { saveCreatedHand } from "@/lib/hand-storage";

const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];
const actionOptions: FormActionType[] = [
  "none",
  "check",
  "call",
  "fold",
  "bet",
  "raise",
];
const streets: Array<{ id: StreetId; label: string; boardLabel?: string }> = [
  { id: "preflop", label: "Preflop" },
  { id: "flop", label: "Flop", boardLabel: "Flop cards" },
  { id: "turn", label: "Turn", boardLabel: "Turn card" },
  { id: "river", label: "River", boardLabel: "River card" },
];

const initialBoard: Record<Exclude<StreetId, "preflop">, string> = {
  flop: "",
  turn: "",
  river: "",
};

function buildInitialStreetActions() {
  const streetActions = {} as StreetActionMap;

  for (const street of streets) {
    streetActions[street.id] = {};

    for (const position of positions) {
      streetActions[street.id][position] = { action: "none", amount: "" };
    }
  }

  return streetActions;
}

function needsAmount(action: FormActionType) {
  return action === "call" || action === "bet" || action === "raise";
}

export function CreateHandForm() {
  const router = useRouter();
  const [inputMode, setInputMode] = useState<InputMode>("structured");
  const [heroPosition, setHeroPosition] = useState("BTN");
  const [heroCards, setHeroCards] = useState({ first: "", second: "" });
  const [board, setBoard] = useState(initialBoard);
  const [actionsByStreet, setActionsByStreet] = useState(
    buildInitialStreetActions,
  );
  const [notes, setNotes] = useState("");

  const canSubmit = useMemo(() => {
    if (inputMode === "voice") {
      return true;
    }

    return heroPosition.trim().length > 0;
  }, [heroPosition, inputMode]);

  function foldedBeforeStreet(street: StreetId) {
    const streetIndex = streets.findIndex((item) => item.id === street);
    const foldedPositions = new Set<string>();

    for (const previousStreet of streets.slice(0, streetIndex)) {
      for (const position of positions) {
        if (actionsByStreet[previousStreet.id][position].action === "fold") {
          foldedPositions.add(position);
        }
      }
    }

    return foldedPositions;
  }

  function activePositionsForStreet(street: StreetId) {
    const foldedPositions = foldedBeforeStreet(street);

    return positions.filter((position) => !foldedPositions.has(position));
  }

  function updatePositionAction(
    street: StreetId,
    position: string,
    patch: Partial<PositionAction>,
  ) {
    setActionsByStreet((current) => {
      const currentAction = current[street][position];
      const nextAction = {
        ...currentAction,
        ...patch,
      };

      if (patch.action && !needsAmount(patch.action)) {
        nextAction.amount = "";
      }

      return {
        ...current,
        [street]: {
          ...current[street],
          [position]: nextAction,
        },
      };
    });
  }

  function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    const hand = createReviewHandFromDraft({
      actionsByStreet,
      board,
      heroCards,
      heroPosition,
      notes,
      positions,
    });

    saveCreatedHand(hand);
    router.push(`/?hand=${hand.id}`);
  }

  return (
    <div className="space-y-6">
      <InputModeToggle onChange={setInputMode} value={inputMode} />

      {inputMode === "voice" ? (
        <div className="rounded-2xl border border-white/10 bg-[#111315] p-5">
          <VoiceRecorder />
        </div>
      ) : (
        <div className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-[#111315] p-5">
            <h2 className="text-sm font-semibold text-white">Hero Setup</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="text-sm font-medium text-zinc-300">
                  Hero position
                </span>
                <select
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-zinc-100 outline-none focus:border-orange-500/60"
                  onChange={(event) => setHeroPosition(event.target.value)}
                  value={heroPosition}
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </label>
              <TextField
                label="Hero card 1"
                onChange={(value) =>
                  setHeroCards((current) => ({ ...current, first: value }))
                }
                placeholder="As"
                value={heroCards.first}
              />
              <TextField
                label="Hero card 2"
                onChange={(value) =>
                  setHeroCards((current) => ({ ...current, second: value }))
                }
                placeholder="Ks"
                value={heroCards.second}
              />
            </div>
          </section>

          {streets.map((street) => {
            const activePositions = activePositionsForStreet(street.id);

            return (
              <section
                className="rounded-2xl border border-orange-500/20 bg-[#15171a] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                key={street.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {street.label}
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      All active positions are shown automatically. Choose each
                      player&apos;s action; folded players are removed from
                      later streets.
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-zinc-400">
                    {activePositions.length} active
                  </span>
                </div>

                {street.boardLabel ? (
                  <div className="mt-5 rounded-xl border border-white/10 bg-[#0c0d0f] p-4">
                    <TextField
                      label={street.boardLabel}
                      onChange={(value) =>
                        setBoard((current) => ({
                          ...current,
                          [street.id as Exclude<StreetId, "preflop">]: value,
                        }))
                      }
                      placeholder={
                        street.id === "flop"
                          ? "Kd 8s 4c"
                          : street.id === "turn"
                            ? "7h"
                            : "2d"
                      }
                      value={board[street.id as Exclude<StreetId, "preflop">]}
                    />
                  </div>
                ) : null}

                <div className="mt-5 grid gap-3">
                  {activePositions.map((position) => {
                    const positionAction = actionsByStreet[street.id][position];

                    return (
                      <div
                        className="grid gap-3 rounded-xl border border-white/10 bg-[#0b0c0e] p-3 md:grid-cols-[90px_1fr_1fr]"
                        key={`${street.id}-${position}`}
                      >
                        <div className="flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.04] px-3">
                          <span className="text-sm font-bold text-zinc-100">
                            {position}
                          </span>
                        </div>

                        <label className="block">
                          <span className="text-xs font-semibold uppercase text-zinc-500">
                            Action
                          </span>
                          <select
                            className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm capitalize text-zinc-100 outline-none focus:border-orange-500/60"
                            onChange={(event) =>
                              updatePositionAction(street.id, position, {
                                action: event.target.value as FormActionType,
                              })
                            }
                            value={positionAction.action}
                          >
                            {actionOptions.map((action) => (
                              <option key={action} value={action}>
                                {action === "none" ? "Select action" : action}
                              </option>
                            ))}
                          </select>
                        </label>

                        <TextField
                          disabled={!needsAmount(positionAction.action)}
                          label="Bet / call size"
                          onChange={(value) =>
                            updatePositionAction(street.id, position, {
                              amount: value,
                            })
                          }
                          placeholder={
                            needsAmount(positionAction.action) ? "9" : "No amount"
                          }
                          value={positionAction.amount}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className="rounded-2xl border border-white/10 bg-[#111315] p-5">
            <label className="block">
              <span className="text-sm font-semibold text-white">Extra Notes</span>
              <textarea
                className="mt-3 min-h-28 w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500/60"
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Villain tendencies, live reads, questions, or tags for review."
                value={notes}
              />
            </label>
          </section>
        </div>
      )}

      <button
        className="flex h-12 w-full items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        disabled={!canSubmit}
        onClick={handleSubmit}
        type="button"
      >
        Save hand and open workspace
      </button>
    </div>
  );
}

type TextFieldProps = {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

function TextField({
  disabled = false,
  label,
  onChange,
  placeholder,
  value,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-orange-500/60 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}
