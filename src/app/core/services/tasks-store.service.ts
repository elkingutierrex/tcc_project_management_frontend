import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksStoreService {
  private _tasksMap = signal<Record<number, Task[]>>({});
  tasksMap = this._tasksMap;

  private _loading = signal(false);
  loading = this._loading;

  private _error = signal<string | null>(null);
  error = this._error;

  constructor(private api: ApiService) {}

  async loadTasks(projectId: number): Promise<Task[]> {
    try {
      this._loading.set(true);
      const tasks = await firstValueFrom(
        this.api.get<Task[]>(`/projects/${projectId}/tasks`)
      );

      this._tasksMap.update(prev => ({ ...prev, [projectId]: tasks ?? [] }));
      return tasks;
    } finally {
      this._loading.set(false);
    }
  }

  async createTask(projectId: number, payload: Omit<Task, 'id' | 'projectId'>) {
    try {
      this._loading.set(true);

      const created = await firstValueFrom(
        this.api.post<Task>(`/projects/${projectId}/tasks`, {
          ...payload,
          projectId,
        })
      );

      this._tasksMap.update(prev => {
        const current = prev[projectId] ?? [];
        return { ...prev, [projectId]: [created, ...current] };
      });

      return created;
    } finally {
      this._loading.set(false);
    }
  }

  async updateStatus(taskId: number, status: Task['status']) {
    try {
      this._loading.set(true);

      const updated = await firstValueFrom(
        this.api.patch<Task>(`/tasks/${taskId}/status`, { status })
      );

      this._tasksMap.update(prev => {
        const copy = { ...prev };
        for (const pid in copy) {
          copy[pid] = copy[pid].map(t => (t.id === updated.id ? updated : t));
        }
        return copy;
      });

      return updated;
    } finally {
      this._loading.set(false);
    }
  }
}
