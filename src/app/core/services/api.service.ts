import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api'; // ajustar según env (usar environment.API_URL)

  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + path).pipe(catchError(this.handleError));
  }

  post<T, B = any>(path: string, body: B): Observable<T> {
    return this.http.post<T>(this.baseUrl + path, body, { headers: this.jsonHeaders }).pipe(catchError(this.handleError));
  }

  patch<T, B = any>(path: string, body: B): Observable<T> {
    return this.http.patch<T>(this.baseUrl + path, body, { headers: this.jsonHeaders }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error', error);
    // mapear errores coherentes para UI
    return throwError(() => error);
  }
}
