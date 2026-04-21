type CoachFeedbackProps = {
  response?: string;
};

export function CoachFeedback({ response }: CoachFeedbackProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-500">
        Feedback
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        {response
          ? "Good. Now connect that idea to villain's continuing range and your sizing. The best review answers explain both the hand class you target and the action you expect next."
          : "Submit your read or pick a chip to get street-specific coaching feedback."}
      </p>
    </div>
  );
}
