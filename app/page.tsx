"use client";

import { useState } from "react";
import { CoachPanel } from "@/components/coach/CoachPanel";
import { SessionSidebar } from "@/components/workspace/SessionSidebar";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { mockSessions, MockSession } from "@/lib/mock-data";
import { loadCreatedHands } from "@/lib/hand-storage";

type WorkspaceState = {
  createdSession: MockSession | null;
  selectedHandId: string;
  selectedSessionId: string;
};

function getInitialWorkspaceState(): WorkspaceState {
  const initialSession = mockSessions[0];
  const initialHand = initialSession.hands[0];

  if (typeof window === "undefined") {
    return {
      createdSession: null,
      selectedHandId: initialHand.id,
      selectedSessionId: initialSession.id,
    };
  }

  const createdHands = loadCreatedHands();

  if (!createdHands.length) {
    return {
      createdSession: null,
      selectedHandId: initialHand.id,
      selectedSessionId: initialSession.id,
    };
  }

  const createdSession = {
    id: "created-hands",
    name: "Created Hands",
    date: "Local drafts",
    hands: createdHands,
  };
  const requestedHandId = new URLSearchParams(window.location.search).get("hand");
  const selectedHandId =
    requestedHandId && createdHands.some((hand) => hand.id === requestedHandId)
      ? requestedHandId
      : initialHand.id;

  return {
    createdSession,
    selectedHandId,
    selectedSessionId:
      selectedHandId === requestedHandId ? createdSession.id : initialSession.id,
  };
}

export default function Home() {
  const initialSession = mockSessions[0];
  const initialHand = initialSession.hands[0];
  const [workspaceState, setWorkspaceState] = useState(getInitialWorkspaceState);
  const { createdSession, selectedHandId, selectedSessionId } = workspaceState;

  const sessions = createdSession
    ? [createdSession, ...mockSessions]
    : mockSessions;
  const session =
    sessions.find((item) => item.id === selectedSessionId) ?? initialSession;
  const hand =
    session.hands.find((sessionHand) => sessionHand.id === selectedHandId) ??
    initialHand;
  const handRefs = sessions.flatMap((item) =>
    item.hands.map((sessionHand) => ({
      sessionId: item.id,
      handId: sessionHand.id,
    })),
  );
  const currentHandIndex = handRefs.findIndex(
    (item) =>
      item.sessionId === selectedSessionId && item.handId === selectedHandId,
  );
  const canGoPreviousHand = currentHandIndex > 0;
  const canGoNextHand = currentHandIndex < handRefs.length - 1;

  function selectHandAtIndex(index: number) {
    const nextHand = handRefs[index];

    if (!nextHand) {
      return;
    }

    setWorkspaceState((current) => ({
      ...current,
      selectedHandId: nextHand.handId,
      selectedSessionId: nextHand.sessionId,
    }));
  }

  return (
    <main className="flex min-h-screen overflow-hidden bg-[#0a0a0b] text-zinc-100">
      <SessionSidebar
        onSelectHand={(sessionId, handId) => {
          setWorkspaceState((current) => ({
            ...current,
            selectedHandId: handId,
            selectedSessionId: sessionId,
          }));
        }}
        selectedHandId={selectedHandId}
        selectedSessionId={selectedSessionId}
        sessions={sessions}
      />
      <WorkspaceLayout
        canGoNextHand={canGoNextHand}
        canGoPreviousHand={canGoPreviousHand}
        hand={hand}
        key={hand.id}
        onNextHand={() => selectHandAtIndex(currentHandIndex + 1)}
        onPreviousHand={() => selectHandAtIndex(currentHandIndex - 1)}
        session={session}
      />
      <CoachPanel hand={hand} />
    </main>
  );
}
