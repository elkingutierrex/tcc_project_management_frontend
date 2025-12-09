import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { MOCK_PROJECTS, MOCK_TASKS } from '../mocks/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  private projects = [...MOCK_PROJECTS];
  private tasks = [...MOCK_TASKS];

  /* ------------------------------------------
      GET — Mimics HttpClient.get<T>()
  ------------------------------------------ */
  get<T>(path: string): T {
    // GET /projects
    if (path === '/projects') {
      return this.projects as any as T;
    }

    // GET /projects/:id/tasks
    const projectTasksMatch = path.match(/^\/projects\/(\d+)\/tasks$/);
    if (projectTasksMatch) {
      const projectId = Number(projectTasksMatch[1]);
      return this.tasks.filter(t => t.projectId === projectId) as any as T;
    }

    // GET /tasks/:id
    const taskMatch = path.match(/^\/tasks\/(\d+)$/);
    if (taskMatch) {
      const id = Number(taskMatch[1]);
      return this.tasks.find(t => t.id === id) as any as T;
    }

    throw new Error(`Mock GET: Unknown path ${path}`);
  }

  /* ------------------------------------------
      POST — Mimics HttpClient.post<T>()
  ------------------------------------------ */
  post<T, B = any>(path: string, body: B): T {
    // POST /projects
    if (path === '/projects') {
      const newProject: Project = {
        ...(body as Project),
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      this.projects.push(newProject);
      return newProject as any as T;
    }

    // POST /projects/:id/tasks
    const projectTaskMatch = path.match(/^\/projects\/(\d+)\/tasks$/);
    if (projectTaskMatch) {
      const projectId = Number(projectTaskMatch[1]);

      const newTask: Task = {
        ...(body as Task),
        id: Date.now(),
        projectId,
        createdAt: new Date().toISOString(),
      };

      this.tasks.unshift(newTask);
      return newTask as any as T;
    }

    throw new Error(`Mock POST: Unknown path ${path}`);
  }

  /* ------------------------------------------
      PATCH — Mimics HttpClient.patch<T>()
  ------------------------------------------ */
  patch<T, B = any>(path: string, body: B): T {
    // PATCH /tasks/:id/status
    const updateStatusMatch = path.match(/^\/tasks\/(\d+)\/status$/);

    if (updateStatusMatch) {
      const taskId = Number(updateStatusMatch[1]);
      const { status } = body as { status: Task['status'] };

      let updated: Task | null = null;

      this.tasks = this.tasks.map(t => {
        if (t.id === taskId) {
          updated = {
            ...t,
            status,
            updatedAt: new Date().toISOString(),
          };
          return updated;
        }
        return t;
      });

      return updated as any as T;
    }

    throw new Error(`Mock PATCH: Unknown path ${path}`);
  }
}
