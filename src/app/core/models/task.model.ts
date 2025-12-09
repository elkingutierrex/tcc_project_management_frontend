export type TaskStatus    = 'CREATED' | 'IN_PROGRESS' | 'CLOSED';
export interface Task {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string; // ISO
  createdAt?: string;
  updatedAt?: string;
}
