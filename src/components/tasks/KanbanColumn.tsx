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
    todo: "bg-[#4A90E2]",
    in_progress: "bg-[#F4A423]",
    completed: "bg-[#4CAF50]",
    on_hold: "bg-[#EB4C60]"
  };

  return (
    <div
      className="flex h-full min-h-[260px] flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header with white background and colored bottom bar */}
      <div className="mb-4 bg-white rounded-t-xl overflow-hidden shadow-sm">
        {/* Colored bar - full width, no padding */}
        <div className={`h-1.5 w-full ${headerColors[status]}`} />
        {/* Title and count */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <span className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs text-slate-600 font-medium">{tasks.length}</span>
        </div>
      </div>

      {/* Cards list - no container background */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {tasks.map(task => (
          <div key={task.id} onDragStart={handleDragStart(task.id)}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};


