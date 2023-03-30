import { Injectable } from '@angular/core';
import { Employee } from '../shared/models/employee.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees').pipe(
      catchError(() => {
        const error = new Error('An error occurred while fetching the employees.');
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
