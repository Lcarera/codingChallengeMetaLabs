import { Employee } from './employee.model';

describe('Employee', () => {
  let employee: Employee;
  var id:number = 1;
  var name:string = 'Test doe';
  var jobTitle:string = 'Test Developer';
  var department:string = 'Testing';
  beforeEach(() => {
    employee = new Employee(id, name, jobTitle, department);
  });

  it('should create an instance', () => {
    expect(employee).toBeTruthy();
  });

  it('should set properties correctly', () => {
    expect(employee.id).toEqual(id);
    expect(employee.name).toEqual(name);
    expect(employee.jobTitle).toEqual(jobTitle);
    expect(employee.department).toEqual(department);
  });

  it('should return a string representation of the employee', () => {
    expect(employee.toString()).toEqual(`${name} (${jobTitle})`);
  });
});