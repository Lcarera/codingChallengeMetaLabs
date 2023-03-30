import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../shared/models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEmployees', () => {
    it('should return an observable of employees', () => {
      const mockEmployees: Employee[] = [
        {id: 1, name: 'John Doe', jobTitle: 'Software Developer', department: 'Engineering'},
        {id: 2, name: 'Jane Doe', jobTitle: 'Product Manager', department: 'Product'},
      ];

      service.getEmployees().subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
      });

      const request = httpMock.expectOne('http://localhost:3000/employees');
      expect(request.request.method).toBe('GET');
      request.flush(mockEmployees);
    });

    it('should return an error if the HTTP request fails', () => {
      service.getEmployees().subscribe(
        () => {
          fail('The request should have failed');
        },
        (error) => {
          expect(error.message).toEqual('An error occurred while fetching the employees.');
        }
      );

      const request = httpMock.expectOne('http://localhost:3000/employees');
      expect(request.request.method).toBe('GET');
      request.error(new ErrorEvent('HTTP error'));
    });
  });
});