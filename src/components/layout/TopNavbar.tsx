import type React from "react";
import avatar from "../../Taskmanageimgs/profilepic.png";
import messagesIcon from "../../Taskmanageimgs/messages-nav.png";
import notificationIcon from "../../Taskmanageimgs/notification.png";
import searchIcon from "../../Taskmanageimgs/search.png";

export const TopNavbar: React.FC = () => {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft">
      <div className="flex items-center gap-3">
        <img src={avatar} alt="الملف الشخصي" className="h-10 w-10 rounded-full object-cover" />
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
          aria-label="الرسائل"
        >
          <img src={messagesIcon} alt="الرسائل" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
          aria-label="التنبيهات"
        >
          <img src={notificationIcon} alt="التنبيهات" className="h-5 w-5" />
        </button>
      </div>

      <div className="min-w-[220px] flex-1">
        <label htmlFor="global-search" className="sr-only">
          بحث
        </label>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
          <input
            id="global-search"
            type="text"
            placeholder="...بحث"
            className="w-full border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <img src={searchIcon} alt="بحث" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};


