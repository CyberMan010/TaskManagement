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
    todo: "bg-[#3B82F6]",
    in_progress: "bg-[#F59E0B]",
    completed: "bg-[#22C55E]",
    on_hold: "bg-[#EF4444]"
  };

  return (
    <div
      className="flex h-full min-h-[260px] flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header with white background and colored top bar - Figma specs: 302x57px, 8px radius, 4px top border */}
      <div className="mb-4 w-full max-w-[302px] h-[57px] bg-[#F1F5F980] rounded-lg overflow-hidden shadow-sm">
        {/* Colored bar at top - 4px height */}
        <div className={`h-1 w-full ${headerColors[status]}`} />
        {/* Title and count */}
        <div className="flex items-center justify-between px-4 h-[calc(100%-4px)]">
          <h2 className="text-lg font-bold text-slate-900 font-Tajawal">{title}</h2>
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


