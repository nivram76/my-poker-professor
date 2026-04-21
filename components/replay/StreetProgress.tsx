import { Street, streets } from "@/lib/mockData";

type StreetProgressProps = {
  currentStreet: Street;
};

export function StreetProgress({ currentStreet }: StreetProgressProps) {
  const currentIndex = streets.indexOf(currentStreet);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-5 gap-2">
        {streets.map((street, index) => {
          const isActive = street === currentStreet;
          const isComplete = index < currentIndex;

          return (
            <div className="flex items-center gap-2" key={street}>
              <div
                className={[
                  "h-2 flex-1 rounded-full",
                  isActive
                    ? "bg-emerald-500"
                    : isComplete
                      ? "bg-emerald-200 dark:bg-emerald-500/40"
                      : "bg-zinc-200 dark:bg-zinc-800",
                ].join(" ")}
              />
              <span
                className={[
                  "hidden text-xs font-semibold sm:inline",
                  isActive
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-500 dark:text-zinc-500",
                ].join(" ")}
              >
                {street}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
