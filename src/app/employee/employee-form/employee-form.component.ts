import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) { }

  ngOnInit() {
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
}