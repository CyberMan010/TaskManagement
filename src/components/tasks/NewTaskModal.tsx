import type React from "react";
import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => Promise<void>;
}

interface FormState {
  title: string;
  description: string;
  project: string;
  department: string;
  assignee: string;
  priority: TaskPriority | "";
  status: TaskStatus | "";
  startDate: string;
  dueDate: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  title: "",
  description: "",
  project: "",
  department: "",
  assignee: "",
  priority: "",
  status: "",
  startDate: "",
  dueDate: ""
};

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.title.trim()) nextErrors.title = "العنوان مطلوب";
    if (!form.project.trim()) nextErrors.project = "المشروع مطلوب";
    if (!form.assignee.trim()) nextErrors.assignee = "المسؤول مطلوب";
    if (!form.startDate) nextErrors.startDate = "تاريخ البدء مطلوب";
    if (!form.status) nextErrors.status = "الحالة مطلوبة";
    if (!form.priority) nextErrors.priority = "الأولوية مطلوبة";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit: React.FormEventHandler = async event => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      project: form.project.trim(),
      department: form.department.trim(),
      assignee: form.assignee.trim(),
      priority: form.priority || "medium",
      status: form.status || "todo",
      startDate: form.startDate,
      dueDate: form.dueDate
    };

    try {
      await onCreate(newTask);
      setForm(initialState);
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitError("حدث خطأ أثناء إنشاء المهمة. حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (hasError?: boolean) =>
    `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 ${
      hasError ? "border-rose-400" : "border-slate-200"
    }`;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-soft">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">إضافة مهمة جديدة</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-1 text-slate-500 hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1">عنوان المهمة</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              className={fieldClass(!!errors.title)}
              placeholder="أدخل عنوان المهمة"
            />
            {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">وصف المهمة</label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              className={`${fieldClass(false)} min-h-[80px] resize-none`}
              placeholder="أدخل وصفاً تفصيلياً للمهمة"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-muted mb-1">المشروع</label>
              <input
                type="text"
                value={form.project}
                onChange={handleChange("project")}
                className={fieldClass(!!errors.project)}
                placeholder="اختر المشروع"
              />
              {errors.project && <p className="mt-1 text-xs text-rose-500">{errors.project}</p>}
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">القسم</label>
              <input
                type="text"
                value={form.department}
                onChange={handleChange("department")}
                className={fieldClass(false)}
                placeholder="اختر القسم"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-muted mb-1">المسؤول</label>
              <input
                type="text"
                value={form.assignee}
                onChange={handleChange("assignee")}
                className={fieldClass(!!errors.assignee)}
                placeholder="اختر المسؤول"
              />
              {errors.assignee && <p className="mt-1 text-xs text-rose-500">{errors.assignee}</p>}
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">الأولوية</label>
              <select value={form.priority} onChange={handleChange("priority")} className={fieldClass(!!errors.priority)}>
                <option value="">اختر الأولوية</option>
                <option value="high">عالي</option>
                <option value="medium">متوسط</option>
                <option value="low">منخفض</option>
              </select>
              {errors.priority && <p className="mt-1 text-xs text-rose-500">{errors.priority}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-muted mb-1">تاريخ البدء</label>
              <input
                type="date"
                value={form.startDate}
                onChange={handleChange("startDate")}
                className={fieldClass(!!errors.startDate)}
              />
              {errors.startDate && <p className="mt-1 text-xs text-rose-500">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">تاريخ الانتهاء</label>
              <input type="date" value={form.dueDate} onChange={handleChange("dueDate")} className={fieldClass(false)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs text-muted mb-1">الحالة</label>
              <select value={form.status} onChange={handleChange("status")} className={fieldClass(!!errors.status)}>
                <option value="">اختر الحالة</option>
                <option value="todo">للتنفيذ</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
                <option value="on_hold">متوقفة</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-rose-500">{errors.status}</p>}
            </div>
          </div>

          {submitError && <p className="text-xs text-rose-500">{submitError}</p>}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              disabled={submitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={submitting || !form.title || !form.project || !form.assignee || !form.startDate || !form.status || !form.priority}
              className="rounded-lg bg-primary px-5 py-2 text-sm text-white shadow-soft disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {submitting ? "جاري الحفظ..." : "حفظ المهمة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


