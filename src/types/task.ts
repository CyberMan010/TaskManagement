export type TaskStatus = "todo" | "in_progress" | "completed" | "on_hold";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  department: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
}


