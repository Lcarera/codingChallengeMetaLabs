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
  private serverUrl = 'http://localhost:8080/api/employees'
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.serverUrl).pipe(
      catchError(() => {
        const error = new Error('An error occurred while fetching the employees.');
        console.error(error);
        return throwError(() => error);
      })
    );
  }
  
  deleteEmployee(id: number):Observable<any> {
    return this.http.delete(this.serverUrl + '/' + id)
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.serverUrl, employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.serverUrl + '/' + id);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.serverUrl + '/' + employee.id, employee);
  }
}
