import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: any[], searchTerm: string): any[] {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}