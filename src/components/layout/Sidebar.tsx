import type React from "react";

interface SidebarProps {
  active: "tasks";
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-sidebar text-slate-100 flex-col py-6 px-4 space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div>
          <p className="text-sm text-logo">TechTeek</p>
          <p className="text-xs text-[#BFC6D5]">نظام إدارة المشاريع</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-logo order-1" />
      </div>

      <nav className="flex-1 space-y-4 text-sm">
        <div>
          <p className="mb-2 px-2 text-xs text-slate-500">إدارة المشاريع</p>
          <button className="w-full flex items-center justify-between rounded-lg bg-primary text-white px-3 py-2 text-sm shadow-soft">
            <span>المهام</span>
            <span className="text-xs text-slate-200">قائمة</span>
          </button>
        </div>

        <div>
          <p className="mb-2 px-2 text-xs text-slate-500">الإعدادات العامة</p>
          <div className="space-y-1 text-slate-400">
            <div className="px-3 py-1 rounded-md hover:bg-slate-800 cursor-pointer">الشركات</div>
            <div className="px-3 py-1 rounded-md hover:bg-slate-800 cursor-pointer">الأقسام</div>
            <div className="px-3 py-1 rounded-md hover:bg-slate-800 cursor-pointer">المستخدمون</div>
            <div className="px-3 py-1 rounded-md hover:bg-slate-800 cursor-pointer">الإعدادات</div>
          </div>
        </div>
      </nav>
    </aside>
  );
};


