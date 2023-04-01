import { Component } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: Employee[];
  selectedSortOption: string = 'id'
  searchTerm: string = '';
  constructor(
	private employeeService: EmployeeService,
	private router: Router,
	private dialog: MatDialog) { }

  ngOnInit() {
	  this.getEmployees();
  }

  getEmployees(): void {
	this.employeeService.getEmployees()
	  .subscribe(employees => this.employees = employees);
  }

  sortEmployees(): void {
	this.employees = this.employees.sort((a:Employee, b:Employee) => {
	  if (a[this.selectedSortOption] < b[this.selectedSortOption]) {
		  return -1;
	  } else if (a[this.selectedSortOption] > b[this.selectedSortOption]) {
		  return 1;
	  } else {
		  return 0;
	  }
	});
  }

	addEmployee():void {
		this.router.navigate(['/add-employee']);
	}

  editEmployee(employeeId:number): void {
    this.router.navigate(['/edit-employee/' + employeeId])
	}

  deleteEmployee(employeeId:number): void {
		const dialogRef = this.dialog.open(DeleteDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.employeeService.deleteEmployee(employeeId).subscribe(() => {
					console.log('Deleted employee with id:' + employeeId);
          this.getEmployees()
				})
			}
		});
  }
}
