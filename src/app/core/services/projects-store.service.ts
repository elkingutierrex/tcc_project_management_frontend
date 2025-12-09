import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import type { Project } from '../models/project.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStoreService {
  private _projects = signal<Project[]>([]);
  readonly projects = this._projects;

  private _loading = signal(false);
  readonly loading = this._loading;

  private _error = signal<string | null>(null);
  readonly error = this._error;

  constructor(private api: ApiService) {}

  async loadProjects(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    try {
      const data = await firstValueFrom(this.api.get<Project[]>('/projects'));
      this._projects.set(data ?? []);
    } catch (err: any) {
      this._error.set(err?.message ?? 'Error al cargar proyectos');
    } finally {
      this._loading.set(false);
    }
  }

  async createProject(payload: Project): Promise<Project | null> {
    this._loading.set(true);
    try {
      const created = await firstValueFrom(this.api.post<Project>('/projects', payload));
      this._projects.update(prev => [created, ...prev]);
      return created;
    } catch (err: any) {
      this._error.set(err?.message ?? 'Error al crear proyecto');
      return null;
    } finally {
      this._loading.set(false);
    }
  }

  // helpers
  getProjectById(id: number) {
    return this._projects().find(p => p.id === id) ?? null;
  }
}
