import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  title:string = 'Add employee'
  employeeId: number;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'edit-employee') {
     this.getEmployee()
    }
   
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    const employee: Employee = this.employeeForm.value;
    if(!this.isEmployeeValid(employee)) return
    if (this.title == 'Add employee') {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          this.messageService.sendMessage('Employee added successfully!', 'success');
         
        },
        error: error => {
          console.error('Error adding employee: ', error);
          this.messageService.sendMessage('Error creating employee, try again later.', 'error');
        }
      });
    } else {
      employee.id = this.employeeId
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          this.messageService.sendMessage('Employee updated successfully!', 'success');
          this.router.navigate(['']);
        },
        error: error => {
          console.error('Error updating employee: ', error);
          this.messageService.sendMessage('Error updating employee, try again later.', 'error');
        }
      });
    }
    this.router.navigate(['']);
  }

  getEmployee():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: employee => {
          this.employeeForm.patchValue(employee);
          this.title = 'Edit employee'
          this.employeeId = id
        },
        error: error => {
          console.error('Error getting the employee with id:' + id, error);
        }
      });
    }
    else{
      console.log("'" +(this.route.snapshot.paramMap.get('id') + "' it is not a valid Id"));
    }
  }

  isEmployeeValid(employee: Employee): boolean {
    if (!employee.name || !employee.jobTitle || !employee.department) {
      return false;
    }
    return true;
  }
}