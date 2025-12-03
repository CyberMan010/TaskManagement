import type React from "react";
import { useMemo, useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { TopNavbar } from "../components/layout/TopNavbar";
import { SummaryCards } from "../components/tasks/SummaryCards";
import { KanbanColumn } from "../components/tasks/KanbanColumn";
import { NewTaskModal } from "../components/tasks/NewTaskModal";
import switch1 from "../Taskmanageimgs/swwithc.svg";
import switch2 from "../Taskmanageimgs/switch2.svg";
import adding from "../Taskmanageimgs/adding.svg";
import filterIcon from "../Taskmanageimgs/filter.svg";
import type { Task, TaskStatus } from "../types/task";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "إعداد مواد التدريب",
    description: "إعداد المستندات والعروض التقديمية للتدريب",
    project: "تدريب الموظفين الجدد",
    department: "الموارد البشرية",
    assignee: "نادية سعيد",
    priority: "high",
    status: "on_hold",
    startDate: "2025-11-01",
    dueDate: "2025-11-20"
  },
  {
    id: "2",
    title: "تصميم الواجهة الرئيسية",
    description: "تصميم واجهة UX/UI للصفحة الرئيسية",
    project: "تطوير الموقع الإلكتروني",
    department: "التصميم",
    assignee: "سارة أحمد",
    priority: "high",
    status: "completed",
    startDate: "2025-11-01",
    dueDate: "2025-11-15"
  },
  {
    id: "3",
    title: "الواجهة الرئيسية للنظام",
    description: "التكامل مع الواجهة الخلفية وخدمة API",
    project: "تطوير النظام الإلكتروني",
    department: "التطوير",
    assignee: "محمد علي",
    priority: "high",
    status: "in_progress",
    startDate: "2025-11-05",
    dueDate: "2025-11-22"
  },
  {
    id: "4",
    title: "إنشاء خطة التسويق ",
    description: "وضع الاستراتيجية التسويقية للمنتج الجديد",
    project: "حملة تسويقية",
    department: "التسويق",
    assignee: "نور محمد",
    priority: "medium",
    status: "todo",
    startDate: "2025-11-10",
    dueDate: "2025-11-25"
  }
];

const viewOptions = [
  { id: "kanban", label: "كانبان", icon: switch1 },
  { id: "table", label: "جدول", icon: switch2 }
] as const;

type ViewMode = (typeof viewOptions)[number]["id"];

const filterOptions = [
  { id: "mine", label: "مهامي", type: "user" },
  { id: "department", label: "القسم", type: "filter" },
  { id: "priority", label: "الأولوية", type: "filter" },
  { id: "status", label: "الحالة", type: "filter" },
  { id: "project", label: "المشروع", type: "filter" },
  { id: "owner", label: "المسؤول", type: "filter" }
] as const;

const UserOutlineIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 16.6667V15a3.33333 3.33333 0 00-3.3333-3.3333H8.33333A3.33333 3.33333 0 005 15v1.6667"
      stroke="#020817"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 9.16667c1.3807 0 2.5-1.11929 2.5-2.5 0-1.38071-1.1193-2.5-2.5-2.5s-2.5 1.11929-2.5 2.5c0 1.38071 1.1193 2.5 2.5 2.5z"
      stroke="#020817"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");

  const grouped = useMemo(
    () => ({
      todo: tasks.filter(t => t.status === "todo"),
      in_progress: tasks.filter(t => t.status === "in_progress"),
      completed: tasks.filter(t => t.status === "completed"),
      on_hold: tasks.filter(t => t.status === "on_hold")
    }),
    [tasks]
  );

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const mockCreateTask = async (task: Task): Promise<void> => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly simulate an error
        if (Math.random() < 0.1) {
          reject(new Error("Mock API error"));
        } else {
          resolve(undefined);
        }
      }, 400);
    });

    setTasks(prev => [...prev, task]);
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-900 " dir="rtl">
      <Sidebar active="tasks" />

      <main className="flex-1">
       
      <header className="py-4 ">
        <TopNavbar />
        </header>
        <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-[160px]">


          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-Tajawal mb-1 lg:mb-2">المهام</h1>
            <p className="text-sm lg:text-base font-normal text-muted font-Inter">إدارة وتتبع جميع المهام</p>
          </div>

        <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] p-1.5 shadow-inner">
              {viewOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={viewMode === option.id}
                  onClick={() => setViewMode(option.id)}
                  className={`flex items-center gap-2 rounded-md px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium transition font-Tajawal ${
                    viewMode === option.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  <img src={option.icon} alt={option.label} className="h-3 lg:h-4 w-3 lg:w-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#182B49] px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-white shadow-soft hover:bg-primary/90 font-Tajawal"
            >
              <img src={adding} alt="adding" className="w-3 lg:w-4 h-3 lg:h-4" />
              <span>مهمة جديدة</span>
            </button>
          </div>
        </div>
          </div>

      
        
    

        

        <SummaryCards tasks={tasks} />

        <section className="space-y-3 mb-6">
          <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm">
            {filterOptions.map(option => (
              <button
                key={option.id}
                type="button"
                className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 lg:px-4 py-1.5 lg:py-2 text-slate-700 shadow-sm transition hover:border-slate-300 font-bold font-Tajawal"
              >
                {option.type === "user" ? (
                  <UserOutlineIcon />
                ) : (
                  <img src={filterIcon} alt="رمز التصفية" className="h-3 lg:h-4 w-3 lg:w-4" />
                )}
                <span className="whitespace-nowrap">{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <KanbanColumn title="للتنفيذ" status="todo" tasks={grouped.todo} onDropTask={handleDropTask} />
          <KanbanColumn title="قيد التنفيذ" status="in_progress" tasks={grouped.in_progress} onDropTask={handleDropTask} />
          <KanbanColumn title="مكتملة" status="completed" tasks={grouped.completed} onDropTask={handleDropTask} />
          <KanbanColumn title="متوقفة" status="on_hold" tasks={grouped.on_hold} onDropTask={handleDropTask} />
        </section>
        </div>
       
    

        
      </main>

      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={mockCreateTask} />
    </div>
  );
};


