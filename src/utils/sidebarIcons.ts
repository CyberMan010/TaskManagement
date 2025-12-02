// Sidebar icon imports
import first from '../Taskmanageimgs/first.png';
import second from '../Taskmanageimgs/2nd.png';
import third from '../Taskmanageimgs/3rd.png';
import fourth from '../Taskmanageimgs/4th.png';
import fifth from '../Taskmanageimgs/5th.png';
import sixth from '../Taskmanageimgs/6th.png';
import seventh from '../Taskmanageimgs/7th.png';
import eighth from '../Taskmanageimgs/8th.png';
import ninth from '../Taskmanageimgs/9th.png';
import tenth from '../Taskmanageimgs/10th.png';
import eleventh from '../Taskmanageimgs/11th.png';
import twelfth from '../Taskmanageimgs/12th.png';
import thirteenth from '../Taskmanageimgs/13th.png';
import fourteenth from '../Taskmanageimgs/14th.png';
import fifteenth from '../Taskmanageimgs/15th.png';
import sixteenth from '../Taskmanageimgs/16th.png';
import seventeenth from '../Taskmanageimgs/17th.png';
import eighteenth from '../Taskmanageimgs/18th.png';
import arrow from '../Taskmanageimgs/arrow.png';
import whiteArrowSelected from '../Taskmanageimgs/whiteArrowSelected.png';

export const sidebarIcons = {
  // Main menu icons (1-8)
  info: first,           // لوحة المعلومات
  projects: second,      // المشاريع
  tasks: third,          // المهام
  reports: fourth,       // التقارير
  social: fifth,         // التفاعل الاجتماعي
  calendar: sixth,       // المواعيد والتقويم
  personal: seventh,     // المهام الشخصية
  team: eighth,          // الفريق
  
  // Settings icons (9-18)
  companies: ninth,      // الشركات
  departments: tenth,    // الأقسام
  divisions: eleventh,   // الفروقة
  notifications: twelfth, // التنبيهات
  messages: thirteenth,  // الرسائل
  users: fourteenth,     // المستخدمون
  permissions: fifteenth, // الصلاحيات والأدوار
  profile: sixteenth,    // الملف الشخصي
  logs: seventeenth,     // Logs
  settings: eighteenth,  // الإعدادات
  
  // Arrows
  arrow: arrow,
  whiteArrowSelected: whiteArrowSelected
};

export type IconKey = keyof typeof sidebarIcons;

