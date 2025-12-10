import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

// Models
import { Project, ProjectStatus } from '../models/project.model';
import { Task } from '../models/task.model';

// API (mock o real)
import { ApiMockService as ApiService } from './api.mock.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsStoreService {
  private _projects = signal<Project[]>([]);
  projects = this._projects;

  private _loading = signal(false);
  loading = this._loading;

  private _error = signal<string | null>(null);
  error = this._error;

  constructor(private api: ApiService) {}

  // -------- UTILITY: resolver observable o valor directo --------
  private async resolve<T>(value: T | Observable<T>): Promise<T> {
    if (value instanceof Observable) {
      return await firstValueFrom(value);
    }
    return value;
  }

  // -------- LOAD PROJECTS --------
  async loadProjects() {
    try {
      this._loading.set(true);

      const data = await this.resolve<Project[]>(this.api.get('/projects'));
      this._projects.set(data ?? []);
    } catch (error) {
      this._error.set('Error loading projects');
    } finally {
      this._loading.set(false);
    }
  }

  // -------- CREATE PROJECT --------
  async createProject(payload: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      this._loading.set(true);

      const created = await this.resolve<Project>(this.api.post('/projects', payload));

      this._projects.update((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      this._error.set('Error creating project');
      throw err;
    } finally {
      this._loading.set(false);
    }
  }

  // -------- UPDATE PROJECT STATUS (manual call from TasksStore) --------
  async updateProjectStatus(projectId: number, payload: { status: ProjectStatus }) {
    return await this.resolve<Project>(this.api.patch(`/projects/${projectId}/status`, payload));
  }

  // -------- LOGIC: AUTO-UPDATE PROJECT STATE BASED ON TASKS --------
  async updateProjectStatusBasedOnTasks(projectId: number, tasks: Task[]) {
    let newStatus: ProjectStatus = 'CREATED';

    if (tasks.length === 0) {
      newStatus = 'CREATED';
    } else if (tasks.every((t) => t.status === 'CLOSED')) {
      newStatus = 'CLOSED';
    } else if (tasks.some((t) => t.status === 'IN_PROGRESS' || t.status === 'CREATED')) {
      newStatus = 'IN_PROGRESS';
    }

    const project = this._projects().find((p) => p.id === projectId);
    if (!project || project.status === newStatus) return;

    // PATCH to API
    const updated = await this.updateProjectStatus(projectId, { status: newStatus });

    // Update signal locally
    this._projects.update((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
  }
}
