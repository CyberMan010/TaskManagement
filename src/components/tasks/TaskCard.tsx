import type React from "react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityLabel: Record<Task["priority"], string> = {
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColor: Record<Task["priority"], string> = {
    high: "bg-rose-100 text-rose-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-emerald-100 text-emerald-700"
  };

  return (
    <div
      className="mb-3 rounded-xl bg-card p-3 shadow-soft cursor-pointer border border-slate-100 hover:border-primary/40 hover:-translate-y-0.5 transition"
      draggable
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColor[task.priority]}`}>
          {priorityLabel[task.priority]}
        </span>
      </div>
      <p className="mb-1 font-medium text-slate-800 line-clamp-2">{task.title}</p>
      <p className="mb-3 text-xs text-muted line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>{task.project}</span>
        <span>{task.dueDate}</span>
      </div>
    </div>
  );
};


