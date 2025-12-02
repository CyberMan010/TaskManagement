import type React from "react";
import type { Task } from "../../types/task";

interface SummaryCardsProps {
  tasks: Task[];
}

const statusMeta = {
  in_progress: { label: "قيد التنفيذ", color: "bg-amber-100 text-amber-700", icon: "🕒" },
  completed: { label: "مكتملة", color: "bg-emerald-100 text-emerald-700", icon: "✅" },
  todo: { label: "للتنفيذ", color: "bg-sky-100 text-sky-700", icon: "📌" },
  on_hold: { label: "متوقفة", color: "bg-rose-100 text-rose-700", icon: "⏸" }
} as const;

export const SummaryCards: React.FC<SummaryCardsProps> = ({ tasks }) => {
  const counts = {
    in_progress: tasks.filter(t => t.status === "in_progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
    todo: tasks.filter(t => t.status === "todo").length,
    on_hold: tasks.filter(t => t.status === "on_hold").length
  };

  const items: Array<keyof typeof counts> = ["in_progress", "completed", "todo", "on_hold"];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-6">
      {items.map(key => (
        <div key={key} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-soft">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted">{statusMeta[key].label}</p>
            <p className="text-2xl font-semibold">{counts[key]}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${statusMeta[key].color}`}>
            <span className="text-lg">{statusMeta[key].icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};


