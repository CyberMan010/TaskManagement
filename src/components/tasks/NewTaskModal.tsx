import type React from "react";
import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import adding from "../../Taskmanageimgs/adding.svg";

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
    `mt-2 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-Inter placeholder:text-slate-400 ${
      hasError ? "border-rose-400" : "border-slate-200 bg-slate-50/30"
    }`;

  const dateFieldClass = (hasError?: boolean) =>
    `mt-2 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-Inter placeholder:text-slate-400 ${
      hasError ? "border-rose-400" : "border-slate-200 bg-slate-50/30"
    }`;

  return (
    <>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="date"] {
          -webkit-appearance: none;
        }
      `}</style>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-6" dir="rtl">
        <div className="w-[699px] h-[954px] overflow-y-auto rounded-[2px] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5">
        <h2 className="text-xl font-bold text-slate-900 font-Tajawal text-center">إضافة مهمة جديدة</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-black hover:text-slate-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* Title */}
          <div >
            <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal ">عنوان المهمة</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              className={fieldClass(!!errors.title)}
              placeholder="أدخل عنوان المهمة"
            />
            {errors.title && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">وصف المهمة</label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              className={`${fieldClass(false)} min-h-[100px] resize-none`}
              placeholder="أدخل وصف تفصيلي للمهمة"
            />
          </div>

          {/* Project and Department */}
          <div className="grid gap-5 md:grid-cols-2 ">
            <div>
              <label className="block text-sm font-medium  text-slate-700 mb-1 font-Tajawal">المشروع</label>
              <select
                value={form.project}
                onChange={handleChange("project")}
                className={fieldClass(!!errors.project)}
              >
                <option value="">اختر المشروع</option>
                <option value="تطوير الموقع">تطوير الموقع</option>
                <option value="حملة تسويقية">حملة تسويقية</option>
                <option value="تدريب الموظفين">تدريب الموظفين</option>
              </select>
              {errors.project && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.project}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">القسم</label>
              <select
                value={form.department}
                onChange={handleChange("department")}
                className={fieldClass(false)}
              >
                <option value="">اختر القسم</option>
                <option value="التطوير">التطوير</option>
                <option value="التسويق">التسويق</option>
                <option value="التصميم">التصميم</option>
                <option value="الموارد البشرية">الموارد البشرية</option>
              </select>
            </div>
          </div>

          {/* Responsible and Priority */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">المسؤول</label>
              <select
                value={form.assignee}
                onChange={handleChange("assignee")}
                className={fieldClass(!!errors.assignee)}
              >
                <option value="">اختر المسؤول</option>
                <option value="محمد علي">محمد علي</option>
                <option value="سارة أحمد">سارة أحمد</option>
                <option value="نادية سعيد">نادية سعيد</option>
                <option value="نور محمد">نور محمد</option>
              </select>
              {errors.assignee && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.assignee}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">الأولوية</label>
              <select value={form.priority} onChange={handleChange("priority")} className={fieldClass(!!errors.priority)}>
                <option value="">اختر الأولوية</option>
                <option value="high">عالي</option>
                <option value="medium">متوسط</option>
                <option value="low">منخفض</option>
              </select>
              {errors.priority && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.priority}</p>}
            </div>
          </div>

          {/* Start Date and End Date */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">تاريخ البدء</label>
              <div className="relative">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={handleChange("startDate")}
                  className={`${dateFieldClass(!!errors.startDate)} pl-10 ${!form.startDate ? 'text-transparent' : ''}`}
                />
                {/* Calendar icon on left */}
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1 pointer-events-none text-slate-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 3H3.5C2.94772 3 2.5 3.44772 2.5 4V11C2.5 11.5523 2.94772 12 3.5 12H10.5C11.0523 12 11.5 11.5523 11.5 11V4C11.5 3.44772 11.0523 3 10.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.5 6H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Placeholder text on right */}
                {!form.startDate && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm font-Inter">
                    اختر تاريخاً
                  </span>
                )}
              </div>
              {errors.startDate && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">تاريخ الانتهاء</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={form.dueDate} 
                  onChange={handleChange("dueDate")} 
                  className={`${dateFieldClass(false)} pl-10 ${!form.dueDate ? 'text-transparent' : ''}`}
                />
                {/* Calendar icon on left */}
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1 pointer-events-none text-slate-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 3H3.5C2.94772 3 2.5 3.44772 2.5 4V11C2.5 11.5523 2.94772 12 3.5 12H10.5C11.0523 12 11.5 11.5523 11.5 11V4C11.5 3.44772 11.0523 3 10.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.5 6H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Placeholder text on right */}
                {!form.dueDate && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm font-Inter">
                    اختر تاريخاً
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">الحالة</label>
            <select value={form.status} onChange={handleChange("status")} className={fieldClass(!!errors.status)}>
              <option value="">اختر الحالة</option>
              <option value="todo">للتنفيذ</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتملة</option>
              <option value="on_hold">متوقفة</option>
            </select>
            {errors.status && <p className="mt-1.5 text-xs text-rose-500 font-Tajawal">{errors.status}</p>}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 font-Tajawal">المرفقات</label>
            <div className="mt-2 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/30 p-8 text-center hover:border-slate-300 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <img src={adding} alt="uploading" className="w-10 lg:w-10 h-10 lg:h-10" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-Tajawal mb-1">انقر لتحميل الملفات أو اسحبها وأفلتها هنا</p>
                  <p className="text-xs text-slate-400 font-Inter">PNG, JPG, Excel, Word, PDF أو GIF (الحد الأقصى: 10 ميجابايت)</p>
                </div>
              </div>
            </div>
          </div>

          {submitError && <p className="text-sm text-rose-500 font-Tajawal">{submitError}</p>}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 justify-end">
          <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-8 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors font-Tajawal"
              disabled={submitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={submitting || !form.title || !form.project || !form.assignee || !form.startDate || !form.status || !form.priority}
              className="rounded-lg bg-[#182B49] px-8 py-2.5 text-sm font-medium text-amber-300 hover:bg-[#0F1B31] transition-colors disabled:cursor-not-allowed disabled:bg-slate-300 font-Tajawal"
            >
              {submitting ? "جاري الحفظ..." : "حفظ المهمة"}
            </button>
           
          </div>
        </form>
      </div>
    </div>
    </>
  );
};


