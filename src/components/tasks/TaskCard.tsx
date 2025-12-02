import type React from "react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
}

const CalendarIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.6667 1.33334V4.00001" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33333 1.33334V4.00001" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 6.66666H14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AttachmentIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 7.66667L7.66667 14C6.95942 14.7072 5.98816 15.1071 4.97487 15.1071C3.96159 15.1071 2.99033 14.7072 2.28308 14C1.57583 13.2928 1.17595 12.3215 1.17595 11.3082C1.17595 10.2949 1.57583 9.32367 2.28308 8.61642L8.61642 2.28308C9.10653 1.79297 9.77174 1.51709 10.4665 1.51709C11.1613 1.51709 11.8265 1.79297 12.3166 2.28308C12.8067 2.77319 13.0826 3.4384 13.0826 4.13317C13.0826 4.82794 12.8067 5.49315 12.3166 5.98325L5.97487 12.3166C5.72982 12.5617 5.39221 12.6996 5.04013 12.6996C4.68805 12.6996 4.35044 12.5617 4.10538 12.3166C3.86033 12.0716 3.72243 11.734 3.72243 11.3819C3.72243 11.0298 3.86033 10.6922 4.10538 10.4472L10.1 4.46667"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuDotsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="3" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="13" r="1" fill="currentColor" />
  </svg>
);

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityLabel: Record<Task["priority"], string> = {
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColor: Record<Task["priority"], string> = {
    high: "bg-red-50 text-red-600",
    medium: "bg-amber-50 text-amber-600",
    low: "bg-emerald-50 text-emerald-600"
  };

  const statusAccent: Record<Task["status"], string> = {
    todo: "bg-blue-500",
    in_progress: "bg-amber-500",
    completed: "bg-emerald-500",
    on_hold: "bg-rose-500"
  };

  return (
    <div
      className="mb-3 rounded-xl bg-white shadow-sm cursor-pointer border border-slate-100 hover:shadow-md transition overflow-hidden"
      draggable
    >
      {/* Top accent bar */}
      <div className={`h-1 ${statusAccent[task.status]}`} />

      <div className="p-4">
        {/* Header with priority badge and menu */}
        <div className="flex items-center justify-between mb-3">
          <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${priorityColor[task.priority]}`}>
            {priorityLabel[task.priority]}
          </span>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1"
            onClick={(e) => {
              e.stopPropagation();
              // Menu action
            }}
          >
            <MenuDotsIcon />
          </button>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-semibold text-slate-900 text-sm line-clamp-1">{task.title}</h3>

        {/* Description */}
        <p className="mb-2 text-xs text-slate-500 line-clamp-2">{task.description}</p>

        {/* Project name */}
        <p className="mb-3 text-xs text-slate-400 line-clamp-1">{task.project}</p>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
          <CalendarIcon />
          <span>{task.dueDate}</span>
        </div>

        {/* Footer with avatar and attachment count */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-medium">
              {task.assignee.charAt(0)}
            </div>
            <span className="text-xs text-slate-700 font-medium">{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <AttachmentIcon />
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
};


