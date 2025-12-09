import { Project } from "../models/project.model";
import { Task } from "../models/task.model";


/* -------------------------
   MOCK PROJECTS
-------------------------- */
export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'TCC Platform Redesign',
    description: 'Redesign of the TCC internal management platform.',
    startDate: '2025-01-10',
    status: 'IN_PROGRESS',
    createdAt: '2025-01-01T08:00:00Z',
    updatedAt: '2025-01-05T09:00:00Z',
  },
  {
    id: 2,
    name: 'Warehouse Automation',
    description: 'Automation improvements for distribution centers.',
    startDate: '2024-12-15',
    status: 'CREATED',
    createdAt: '2024-12-10T10:00:00Z',
  },
  {
    id: 3,
    name: 'Driver Mobile App',
    description: 'App for delivery drivers with tracking features.',
    startDate: '2025-02-01',
    status: 'CREATED',
    createdAt: '2025-01-20T13:20:00Z',
  }
];

/* -------------------------
   MOCK TASKS
-------------------------- */
export const MOCK_TASKS: Task[] = [
  // Project 1
  {
    id: 1,
    projectId: 1,
    title: 'Create wireframes',
    description: 'Low-fi and hi-fi wireframes for the redesign.',
    status: 'IN_PROGRESS',
    dueDate: '2025-01-20',
    createdAt: '2025-01-02T09:00:00Z',
  },
  {
    id: 2,
    projectId: 1,
    title: 'UI Components Setup',
    status: 'CREATED',
    dueDate: '2025-01-25',
    createdAt: '2025-01-05T13:00:00Z',
  },

  // Project 2
  {
    id: 3,
    projectId: 2,
    title: 'Sensor installation audit',
    status: 'CREATED',
    dueDate: '2024-12-20',
  },
  {
    id: 4,
    projectId: 2,
    title: 'Prepare technical documentation',
    status: 'IN_PROGRESS',
    dueDate: '2024-12-22',
  },

  // Project 3
  {
    id: 5,
    projectId: 3,
    title: 'Define MVP features',
    status: 'CREATED',
    dueDate: '2025-02-05',
  },
  {
    id: 6,
    projectId: 3,
    title: 'API contract definition',
    status: 'CREATED',
    dueDate: '2025-02-10',
  }
];
