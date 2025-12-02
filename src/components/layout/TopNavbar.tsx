import type React from "react";
import avatar from "../../Taskmanageimgs/profilepic.png";
import messagesIcon from "../../Taskmanageimgs/messages-nav.png";
import notificationIcon from "../../Taskmanageimgs/notification.png";
import searchIcon from "../../Taskmanageimgs/search.png";

export const TopNavbar: React.FC = () => {
  return (
    <div className="mb-6 flex items-center  justify-end border-b border-slate-200 pb-4">
            <label htmlFor="global-search" className="sr-only">
          بحث
        </label>
        <div className="flex items-center gap-2 rounded-md bg-[#F5F7FA] px-4 py-2">
            <img src={searchIcon} alt="بحث" className="h-6 w-6 opacity-70" />
          <input
            id="global-search"
            type="text"
            placeholder="بحث..."
            className="w-full border-none bg-transparent text-sm text-[#1E3A5F] placeholder:text-[#7B8AA8] focus:outline-none"
          />
        </div>
        
      <div className="flex items-center">
        <button
          type="button"
          className=" flex h-10 w-10 items-center justify-center   "
          aria-label="التنبيهات"
        >
          <img src={notificationIcon} alt="التنبيهات" className="h-5 w-5" />
         
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center  "
          aria-label="الرسائل"
        >
          <img src={messagesIcon} alt="الرسائل" className="h-5 w-5" />
        </button>
      </div>
         

      
      <div className="w-[160px]">
      <img src={avatar} alt="الملف الشخصي" className="h-10 w-10 rounded-full object-cover" />

      </div>
    </div>
  );
};


