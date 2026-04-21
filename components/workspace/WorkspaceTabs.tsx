export type WorkspaceTab = "replay" | "context";

type WorkspaceTabsProps = {
  activeTab: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
};

const tabs: Array<{ id: WorkspaceTab; label: string }> = [
  { id: "replay", label: "Replay" },
  { id: "context", label: "Context" },
];

export function WorkspaceTabs({ activeTab, onChange }: WorkspaceTabsProps) {
  return (
    <div className="flex h-12 items-center border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              className={[
                "h-9 rounded-md px-4 text-sm font-semibold transition",
                isActive
                  ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
              ].join(" ")}
              key={tab.id}
              onClick={() => onChange(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
