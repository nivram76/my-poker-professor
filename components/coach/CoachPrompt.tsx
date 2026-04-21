import { HandAction, Street } from "@/lib/mockData";

type CoachPromptProps = {
  action: HandAction;
  street: Street;
};

export function CoachPrompt({ action, street }: CoachPromptProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-black">
      <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">
        Coach prompt
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-800 dark:text-zinc-200">
        {action.actor === "Hero"
          ? `On the ${street.toLowerCase()}, what was your plan when you ${action.action}${action.amount ? ` ${action.amount}` : ""}?`
          : `Villain ${action.action}${action.amount ? ` ${action.amount}` : ""} on the ${street.toLowerCase()}. What range or incentive do you assign here?`}
      </p>
    </div>
  );
}
