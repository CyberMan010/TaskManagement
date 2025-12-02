import type React from "react";
import { sidebarIcons } from "../../utils/sidebarIcons";

interface SidebarProps {
  active?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ active = "tasks" }) => {
  const menuItems = [
    { id: "info", label: "لوحة المعلومات", icon: "info" as const },
    { id: "projects", label: "المشاريع", icon: "projects" as const },
    { id: "tasks", label: "المهام", icon: "tasks" as const },
    { id: "reports", label: "التقارير", icon: "reports" as const },
    { id: "social", label: "التفاعل الاجتماعي", icon: "social" as const },
    { id: "calendar", label: "المواعيد والتقويم", icon: "calendar" as const },
    { id: "personal", label: "المهام الشخصية", icon: "personal" as const },
    { id: "team", label: "الفريق", icon: "team" as const }
  ];

  const settingsItems = [
    { id: "companies", label: "الشركات", icon: "companies" as const },
    { id: "departments", label: "الأقسام", icon: "departments" as const },
    { id: "divisions", label: "الفروقة", icon: "divisions" as const },
    { id: "notifications", label: "التنبيهات", icon: "notifications" as const },
    { id: "messages", label: "الرسائل", icon: "messages" as const },
    { id: "users", label: "المستخدمون", icon: "users" as const },
    { id: "permissions", label: "الصلاحيات والأدوار", icon: "permissions" as const },
    { id: "profile", label: "الملف الشخصي", icon: "profile" as const },
    { id: "logs", label: "Logs", icon: "logs" as const },
    { id: "settings", label: "الإعدادات", icon: "settings" as const }
  ];

  return (
    <aside className="hidden lg:flex w-80 h-947px bg-sidebar text-slate-100 flex-col py-5 overflow-y-auto" style={{ paddingLeft: '15.5px', paddingRight: '14.5px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex-1">
          <p className="text-lg font-family-Inter font-bold text-[#C9B57A]">TechTeek</p>
          <p className="text-xs text-[#BFC6D5]">نظام إدارة المشاريع</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#C9B57A]" />
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-0 mb-4 bg-transparent border border-[#288EC7] rounded-xl p-1">
        <button className="flex-1 rounded-[12px] bg-[#288EC7] text-[#16243D] px-4 py-2 text-sm font-medium transition-all drop-shadow-sm shadow-sm">
          إدارة المشاريع
        </button>
        <button className="flex-1 rounded-full text-[#288EC7D9] px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-all">
          إدارة التذاكر
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-0.5 text-sm">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between py-2.5 rounded-lg text-right transition-colors ${
              active === item.id
                ? "bg-[#288EC726] text-white"
                : "text-slate-300 hover:bg-[#243041] hover:text-white"
            }`}
            style={{ paddingLeft: '12px', paddingRight: '12px' }}
          >
            <span className="flex items-center gap-2">
              <img 
                src={sidebarIcons[item.icon]} 
                alt={item.label} 
                className="w-5 h-5"
              />
              <span className="text-sm">{item.label}</span>
            </span>
            <img 
              src={active === item.id ? sidebarIcons.whiteArrowSelected : sidebarIcons.arrow} 
              alt="arrow" 
              className="w-4 h-4"
            />
          </button>
        ))}

        {/* Settings Section */}
        <div className="pt-4">
          <p className="pb-2 text-xs text-[#288EC7D9] font-medium" style={{ paddingLeft: '12px' }}>الإعدادات العامة</p>
          {settingsItems.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between py-2.5 rounded-lg text-right text-slate-300 hover:bg-[#243041] hover:text-white transition-colors"
              style={{ paddingLeft: '12px', paddingRight: '12px' }}
            >
              <span className="flex items-center gap-2">
                <img 
                  src={sidebarIcons[item.icon]} 
                  alt={item.label} 
                  className="w-5 h-5"
                />
                <span className="text-sm">{item.label}</span>
              </span>
              <img 
                src={sidebarIcons.arrow} 
                alt="arrow" 
                className="w-4 h-4"
              />
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};


