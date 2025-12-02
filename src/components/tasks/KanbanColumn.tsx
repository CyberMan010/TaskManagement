import type React from "react";
import type { Task, TaskStatus } from "../../types/task";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, status, tasks, onDropTask }) => {
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  const handleDragStart =
    (taskId: string): React.DragEventHandler<HTMLDivElement> =>
    event => {
      event.dataTransfer.setData("text/plain", taskId);
      event.dataTransfer.effectAllowed = "move";
    };

  const headerColors: Record<TaskStatus, string> = {
    todo: "border-sky-500",
    in_progress: "border-amber-500",
    completed: "border-emerald-500",
    on_hold: "border-rose-500"
  };

  return (
    <div
      className="flex h-full min-h-[260px] flex-col rounded-xl bg-slate-50 border border-slate-100"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`flex items-center justify-between border-b px-3 py-2 text-sm font-medium ${headerColors[status]}`}>
        <span>{title}</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs text-muted shadow-sm">{tasks.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {tasks.map(task => (
          <div key={task.id} onDragStart={handleDragStart(task.id)}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};


