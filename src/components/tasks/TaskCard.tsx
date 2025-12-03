import type React from "react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
}

const MenuDotsIcon: React.FC = () => (
  <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="3" r="1.5" fill="#94A3B8" />
    <circle cx="3" cy="10" r="1.5" fill="#94A3B8" />
    <circle cx="3" cy="17" r="1.5" fill="#94A3B8" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2V5" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 2V5" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 3H1.5C0.947715 3 0.5 3.44772 0.5 4V11C0.5 11.5523 0.947715 12 1.5 12H8.5C9.05228 12 9.5 11.5523 9.5 11V4C9.5 3.44772 9.05228 3 8.5 3Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.5 6H9.5" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CommentIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8.5C12 8.76522 11.8946 9.01957 11.7071 9.20711C11.5196 9.39464 11.2652 9.5 11 9.5H4L2 11.5V3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5H11C11.2652 2.5 11.5196 2.60536 11.7071 2.79289C11.8946 2.98043 12 3.23478 12 3.5V8.5Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttachmentIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 6.66667L6.66667 13C5.95942 13.7072 4.98816 14.1071 3.97487 14.1071C2.96159 14.1071 1.99033 13.7072 1.28308 13C0.575831 12.2928 0.175952 11.3215 0.175952 10.3082C0.175952 9.29494 0.575831 8.32367 1.28308 7.61642L7.61642 1.28308C8.10653 0.792973 8.77174 0.517088 9.46651 0.517088C10.1613 0.517088 10.8265 0.792973 11.3166 1.28308C11.8067 1.77319 12.0826 2.4384 12.0826 3.13317C12.0826 3.82794 11.8067 4.49315 11.3166 4.98325L4.97487 11.3166C4.72982 11.5617 4.39221 11.6996 4.04013 11.6996C3.68805 11.6996 3.35044 11.5617 3.10538 11.3166C2.86033 11.0716 2.72243 10.734 2.72243 10.3819C2.72243 10.0298 2.86033 9.69221 3.10538 9.44716L9.1 3.46667" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priorityLabel: Record<Task["priority"], string> = {
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  };

  const priorityColor: Record<Task["priority"], string> = {
    high: "bg-[#FEE2E2] text-[#C2410C]",
    medium: "bg-[#FEF3C7] text-[#C2410C]",
    low: "bg-[#D1FAE5] text-[#16A34A]"
  };
//new format date from YYYY-MM-DD to DD/MM/YYYY
 
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className="relative w-full rounded-lg bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all border border-slate-200"
      draggable
      dir="rtl"
      style={{ minHeight: "198px" }}
    >
      {/* Header with priority badge and three dots */}
      <div className="flex items-start justify-between mb-4">
         {/* Title */}
      <h3 className="mb-2 font-medium text-slate-900 text-[15px] leading-tight  font-Tajawal">
        {task.title}
      </h3>
        <span className={`rounded-[11px] px-4 py-1.5 text-xs font-semibold font-Tajawal ${priorityColor[task.priority]}`}>
          {priorityLabel[task.priority]}
        </span>
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing -mt-1 hover:bg-slate-50 rounded p-1 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MenuDotsIcon />
        </button>
      </div>

     

      {/* Description */}
      <p className="mb-2 text-[13px] text-slate-500 leading-relaxed line-clamp-3 font-Inter">
        {task.description}
      </p>

      {/* Category/Project */}
      <p className="mb-4 text-[12px] text-slate-400 line-clamp-1 font-Inter">
        {task.project}
      </p>

      {/* Footer with date on left and icons on right */}
      <div className="flex items-center justify-between">
        {/* Left side: Date and Avatar */}
        <div className="flex items-center gap-3">
          {/* Date with calendar icon */}
          <div className="flex items-center gap-1.5 text-slate-500 text-[13px] font-Inter">
            <CalendarIcon />
            <span>{formatDate(task.dueDate)}</span>
          </div>

         
        </div>

        {/* Right side: Comment and Attachment icons */}
        <div className="flex items-center gap-3 text-slate-400 text-xs font-Inter">
          
          {/* Attachment count */}
          <div className="flex items-center gap-1">
            <AttachmentIcon />
            <span>5</span>
          </div>
          {/* Comment count */}
          <div className="flex items-center gap-1">
            <CommentIcon />
            <span>2</span>
          </div>
        </div>
      </div>
      {/* Avatar with initials - positioned at bottom-left */}
      <div className="absolute left-[17px] w-6 h-6 rounded-full bg-[#182B49] flex items-center justify-center text-white text-[10px] font-medium font-Tajawal">
        {task.assignee.split(' ').map(n => n.charAt(0)).join('')}
      </div>
    </div>
  );
};
