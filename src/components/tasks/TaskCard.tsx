import type React from "react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
}

const MenuDotsIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="4" r="1.5" fill="#94A3B8" />
    <circle cx="10" cy="10" r="1.5" fill="#94A3B8" />
    <circle cx="10" cy="16" r="1.5" fill="#94A3B8" />
  </svg>
);

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

const CommentIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 10C14 10.3536 13.8595 10.6928 13.6095 10.9428C13.3594 11.1929 13.0203 11.3333 12.6667 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10Z"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityLabel: Record<Task["priority"], string> = {
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColor: Record<Task["priority"], string> = {
    high: "bg-[#FEE2E2] text-[#EB4C60]",
    medium: "bg-[#FEF3C7] text-[#F4A423]",
    low: "bg-[#D1FAE5] text-[#4CAF50]"
  };

  return (
    <div
      className="w-full max-w-[302px] h-[230px] rounded-lg bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow border border-slate-100"
      draggable
      dir="rtl"
    >
      {/* Header with priority badge and three dots */}
      <div className="flex items-start justify-between mb-3">
        <span className={`rounded-md px-3 py-1 text-xs font-semibold font-Tajawal ${priorityColor[task.priority]}`}>
          {priorityLabel[task.priority]}
        </span>
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing p-0.5 hover:bg-slate-50 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MenuDotsIcon />
        </button>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 font-Tajawal">
        {task.title}
      </h3>

      {/* Description */}
      <p className="mb-2 text-[13px] text-slate-500 leading-relaxed line-clamp-2 font-Inter">
        {task.description}
      </p>

      {/* Category/Project */}
      <p className="mb-3 text-[12px] text-slate-400 line-clamp-1 font-Inter">
        {task.project}
      </p>

      {/* Date with calendar icon */}
      <div className="flex items-center justify-end gap-1.5 text-slate-500 text-[13px] mb-4 font-Inter">
        <span>{task.dueDate}</span>
        <CalendarIcon />
      </div>

      {/* Footer with icons and avatar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 font-Inter">
        <div className="flex items-center gap-3">
          {/* Comment count */}
          <div className="flex items-center gap-1 text-slate-400">
            <CommentIcon />
            <span className="text-xs">2</span>
          </div>
          {/* Attachment count */}
          <div className="flex items-center gap-1 text-slate-400">
            <AttachmentIcon />
            <span className="text-xs">3</span>
          </div>
        </div>

        {/* Avatar with initials */}
        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-semibold font-Tajawal">
          {task.assignee.split(' ').map(n => n.charAt(0)).join('')}
        </div>
      </div>
    </div>
  );
};
