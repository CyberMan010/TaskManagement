import type React from "react";
import type { Task } from "../../types/task";
import onHoldIcon from "../../Taskmanageimgs/redInfo.svg";
import completedIcon from "../../Taskmanageimgs/correct.svg";
import inProgressIcon from "../../Taskmanageimgs/clock.svg";
import todoIcon from "../../Taskmanageimgs/info.svg";

interface SummaryCardsProps {
  tasks: Task[];
}

const statusMeta = {
  todo: {
    label: "للتنفيذ",
    icon: todoIcon,
    badge: "bg-sky-50 text-sky-600",
    accent: "text-sky-900"
  },
  completed: {
    label: "مكتملة",
    icon: completedIcon,
    badge: "bg-emerald-50 text-emerald-600",
    accent: "text-emerald-900"
  },
  in_progress: {
    label: "قيد التنفيذ",
    icon: inProgressIcon,
    badge: "bg-amber-50 text-amber-600",
    accent: "text-amber-900"
  },
  on_hold: {
    label: "متوقفة",
    icon: onHoldIcon,
    badge: "bg-rose-50 text-rose-600",
    accent: "text-rose-900"
  }
 
} as const;

const items: Array<keyof typeof statusMeta> = ["todo", "in_progress", "completed", "on_hold"];

export const SummaryCards: React.FC<SummaryCardsProps> = ({ tasks }) => {
  const counts = {
    on_hold: tasks.filter(t => t.status === "on_hold").length,
    completed: tasks.filter(t => t.status === "completed").length,
    in_progress: tasks.filter(t => t.status === "in_progress").length,
    todo: tasks.filter(t => t.status === "todo").length
  };

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map(key => (
        <div
          key={key}
          className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0px_1px_3px_rgba(15,23,42,0.08)]"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${statusMeta[key].badge}`}>
              <img src={statusMeta[key].icon} alt={statusMeta[key].label} className="h-5 w-5" />
            </div>
            <div>
            <p className="text-sm  text-gray-500">{statusMeta[key].label}</p>
          <p className="text-2xl font-semibold text-slate-900">{counts[key]}</p>

            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

