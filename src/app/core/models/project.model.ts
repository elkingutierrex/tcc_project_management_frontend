export type ProjectStatus = 'CREATED' | 'IN_PROGRESS' | 'CLOSED';

export interface Project {
  id?: number;
  name: string;
  description?: string;
  startDate: string;
  status: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
}

