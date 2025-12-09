import { Injectable, signal } from '@angular/core';
// import { ApiService } from './api.service';
import { ApiMockService as ApiService } from './api.mock.service';
import { Project } from '../models/project.model';
import { firstValueFrom, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStoreService {

  private _projects = signal<Project[]>([]);
  projects = this._projects;

  private _loading = signal(false);
  loading = this._loading;

  private _error = signal<string | null>(null);
  error = this._error;

  constructor(private api: ApiService) {}

  private async resolve<T>(value: any): Promise<T> {
    if (value && typeof value.subscribe === 'function') {
      return await firstValueFrom(value);
    }
    return value;
  }

  async loadProjects() {
    try {
      this._loading.set(true);

      const data = await this.resolve<Project[]>(
        this.api.get('/projects')
      );

      this._projects.set(data ?? []);

    } catch (error) {
      this._error.set('Error loading projects');

    } finally {
      this._loading.set(false);
    }
  }

  async createProject(payload: Omit<Project, 'id' | 'createdAt'>) {
    try {
      this._loading.set(true);

      const created = await this.resolve<Project>(
        this.api.post('/projects', payload)
      );

      this._projects.update(prev => [created, ...prev]);
      return created;

    } catch (err) {
      this._error.set('Error creating project');
      throw err;

    } finally {
      this._loading.set(false);
    }
  }
}
