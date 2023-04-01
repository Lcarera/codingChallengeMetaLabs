import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

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
    this.employeeService.addEmployee(employee).subscribe({
      next: () => {
        console.log('Employee added successfully!');
      },
      error: error => {
        console.error('Error adding employee: ', error);
      }
    });
  }

  getEmployee():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: employee => {
          this.employeeForm.patchValue(employee);
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
}