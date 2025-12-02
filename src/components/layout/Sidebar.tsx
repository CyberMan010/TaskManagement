import type React from "react";

interface SidebarProps {
  active?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ active = "tasks" }) => {
  const menuItems = [
    { id: "info", label: "لوحة المعلومات", icon: "📊" },
    { id: "projects", label: "المشاريع", icon: "💼" },
    { id: "tasks", label: "المهام", icon: "📋" },
    { id: "reports", label: "التقارير", icon: "📈" },
    { id: "social", label: "التفاعل الاجتماعي", icon: "💬" },
    { id: "calendar", label: "المواعيد والتقويم", icon: "📅" },
    { id: "personal", label: "المهام الشخصية", icon: "📝" },
    { id: "team", label: "الفريق", icon: "👥" }
  ];

  const settingsItems = [
    { id: "companies", label: "الشركات", icon: "🏢" },
    { id: "departments", label: "الأقسام", icon: "🏛️" },
    { id: "divisions", label: "الفروقة", icon: "👥" },
    { id: "notifications", label: "التنبيهات", icon: "🔔" },
    { id: "messages", label: "الرسائل", icon: "💬" },
    { id: "users", label: "المستخدمون", icon: "👥" },
    { id: "permissions", label: "الصلاحيات والأدوار", icon: "🛡️" },
    { id: "profile", label: "الملف الشخصي", icon: "👤" },
    { id: "logs", label: "Logs", icon: "📄" },
    { id: "settings", label: "الإعدادات", icon: "⚙️" }
  ];

  return (
    <aside className="hidden lg:flex w-80 bg-[#1a2332] text-slate-100 flex-col py-5 px-3 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 mb-5">
        <div className="flex-1">
          <p className="text-base font-medium text-[#C9B57A]">TechTeek</p>
          <p className="text-xs text-slate-400">نظام إدارة المشاريع</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-[#C9B57A]" />
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-4 px-2">
        <button className="flex-1 rounded-lg bg-primary text-white px-4 py-2.5 text-sm font-medium">
          إدارة المشاريع
        </button>
        <button className="flex-1 rounded-lg border border-primary/30 text-primary px-4 py-2.5 text-sm font-medium hover:bg-primary/10">
          إدارة المذاكر
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-0.5 text-sm">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-right transition-colors ${
              active === item.id
                ? "bg-[#2d3f5a] text-white"
                : "text-slate-300 hover:bg-[#243041] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xs opacity-50">›</span>
              <span className="text-sm">{item.label}</span>
            </span>
            <span className="text-base opacity-70">{item.icon}</span>
          </button>
        ))}

        {/* Settings Section */}
        <div className="pt-4">
          <p className="px-3 pb-2 text-xs text-primary font-medium">الإعدادات العامة</p>
          {settingsItems.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-right text-slate-300 hover:bg-[#243041] hover:text-white transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="text-xs opacity-50">›</span>
                <span className="text-sm">{item.label}</span>
              </span>
              <span className="text-base opacity-70">{item.icon}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};


