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
    title: "إنشاء خطة التسويق للمنتج الجديد",
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

      <main className="flex-1 ">
      <header className="py-4 ">
        <TopNavbar />


        </header>
       
        <div className="px-4 lg:px-8 ">


          <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 font-Tajawal">المهام</h1>
            <p className="text-xs text-muted mt-1">إدارة وتتبع جميع المهام</p>
          </div>

        <div className="flex flex-wrap items-center gap-2 mb-4 px-2">
            <div className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] p-1.5 shadow-inner">
              {viewOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={viewMode === option.id}
                  onClick={() => setViewMode(option.id)}
                  className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition ${
                    viewMode === option.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  <img src={option.icon} alt={option.label} className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          <div className="flex flex-wrap gap-2 ">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#182B49] px-4 py-3 text-sm text-white shadow-soft hover:bg-primary/90"
            >
              <span className="text-lg"><img src={adding} alt="adding" className="w-4 h-4" /></span>
              <span>مهمة جديدة</span>
            </button>
          </div>
        </div>
          </div>

      
        
    

        

        <SummaryCards tasks={tasks} />

        <section className="space-y-3 mb-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded-full bg-slate-900 text-white px-3 py-1">إظهار الكل</button>
            <button className="rounded-full bg-white px-3 py-1 text-muted border border-slate-200">الأقسام</button>
            <button className="rounded-full bg-white px-3 py-1 text-muted border border-slate-200">الأولوية</button>
            <button className="rounded-full bg-white px-3 py-1 text-muted border border-slate-200">الحالة</button>
            <button className="rounded-full bg-white px-3 py-1 text-muted border border-slate-200">المشروع</button>
          </div>
        </section>

        <section className="grid gap-3 xl:gap-4 md:grid-cols-2 xl:grid-cols-4">
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


