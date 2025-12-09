import { Injectable, signal } from '@angular/core';
// import { ApiService } from './api.service';
import { ApiMockService as ApiService } from './api.mock.service';
import { Task } from '../models/task.model';
import { firstValueFrom, isObservable } from 'rxjs';

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

  /* -----------------------------------
        Helper to support MOCK + REAL
  ------------------------------------ */
private async resolve<T>(value: any): Promise<T> {
  if (value && typeof value.subscribe === 'function') {
    return await firstValueFrom(value) as T;
  }
  return value as T;
}

  /* -----------------------------------
      LOAD TASKS FOR PROJECT
  ------------------------------------ */
  async loadTasks(projectId: number): Promise<Task[]> {
    try {
      this._loading.set(true);

      const result = await this.resolve<Task[]>(
        this.api.get(`/projects/${projectId}/tasks`)
      );

      this._tasksMap.update(prev => ({
        ...prev,
        [projectId]: result ?? []
      }));

      return result ?? [];

    } catch (err) {
      this._error.set('Error loading tasks');
      return [];
    } finally {
      this._loading.set(false);
    }
  }

  /* -----------------------------------
      CREATE TASK
  ------------------------------------ */
  async createTask(
    projectId: number,
    payload: Omit<Task, 'id' | 'projectId'>
  ): Promise<Task> {
    try {
      this._loading.set(true);

      const created = await this.resolve<Task>(
        this.api.post(`/projects/${projectId}/tasks`, {
          ...payload,
          projectId
        })
      );

      this._tasksMap.update(prev => ({
        ...prev,
        [projectId]: [created, ...(prev[projectId] || [])]
      }));

      return created;

    } catch (err) {
      this._error.set('Error creating task');
      throw err;
    } finally {
      this._loading.set(false);
    }
  }

  /* -----------------------------------
      UPDATE TASK STATUS
  ------------------------------------ */
  async updateStatus(taskId: number, status: Task['status']): Promise<Task> {
    try {
      this._loading.set(true);

      const updated = await this.resolve<Task>(
        this.api.patch(`/tasks/${taskId}/status`, { status })
      );

      this._tasksMap.update(prev => {
        const updatedMap = { ...prev };

        for (const pid in updatedMap) {
          updatedMap[pid] = updatedMap[pid].map(t =>
            t.id === updated.id ? updated : t
          );
        }

        return updatedMap;
      });

      return updated;

    } catch (err) {
      this._error.set('Error updating task status');
      throw err;
    } finally {
      this._loading.set(false);
    }
  }
}
