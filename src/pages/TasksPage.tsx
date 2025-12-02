import type React from "react";
import { useMemo, useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { SummaryCards } from "../components/tasks/SummaryCards";
import { KanbanColumn } from "../components/tasks/KanbanColumn";
import { NewTaskModal } from "../components/tasks/NewTaskModal";
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

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="flex min-h-screen bg-slate-100 text-slate-900" dir="rtl">
      <Sidebar active="tasks" />

      <main className="flex-1 px-4 py-4 lg:px-8 lg:py-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">المهام</h1>
            <p className="text-xs text-muted mt-1">إدارة وتتبع جميع المهام</p>
          </div>
          <button className="relative rounded-full bg-white p-2 shadow-soft border border-slate-100">
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              3
            </span>
            🔔
          </button>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-soft hover:bg-primary/90"
            >
              <span>مهمة جديدة</span>
              <span className="text-lg">＋</span>
            </button>
            <button className="rounded-lg bg-white px-3 py-1.5 text-xs text-muted border border-slate-200">كانبان</button>
            <button className="rounded-lg bg-white px-3 py-1.5 text-xs text-muted border border-slate-200">جدول</button>
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
      </main>

      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={mockCreateTask} />
    </div>
  );
};


