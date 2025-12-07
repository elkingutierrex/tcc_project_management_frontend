import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private readonly base = `${environment.apiBaseUrl}/projects`;
  private readonly http = inject(HttpClient);

 listProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.base).pipe(catchError(this.handleError));
  }

  createProject(payload: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.base, payload).pipe(catchError(this.handleError));
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ProjectsService error', error);
    return throwError(() => error);
  }
}
