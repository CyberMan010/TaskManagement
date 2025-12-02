import type React from "react";
import avatar from "../../Taskmanageimgs/profilepic.png";
import messagesIcon from "../../Taskmanageimgs/messages-nav.svg";
import nofitication from "../../Taskmanageimgs/nofitication.svg";
import searchIcon from "../../Taskmanageimgs/search.png";

export const TopNavbar: React.FC = () => {
  return (
    <div className=" flex items-center  justify-end border-b border-slate-200 pb-4 ">
            <label htmlFor="global-search" className="sr-only">
          بحث
        </label>
        <div className="flex items-center gap-2 rounded-md bg-[#F5F7FA] px-4 py-1">
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
          className="flex items-center justify-center h-10 w-10 "
          aria-label="التنبيهات"
        >
          <img src={nofitication} alt="التنبيهات" className="h-6 w-6" />
         
        </button>

        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 "
          aria-label="الرسائل"
        >
          <img src={messagesIcon} alt="الرسائل" className="h-6 w-6" />
        </button>
      </div>
         

      
      <div className="w-[160px]">
      <img src={avatar} alt="الملف الشخصي" className="h-10 w-10 rounded-full object-cover" />

      </div>
    </div>
  );
};


