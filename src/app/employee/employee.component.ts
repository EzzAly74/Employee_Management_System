import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    TableModule,
    RippleModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  constructor(
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {}

  @ViewChild('dt') table!: Table;
  endPoint!: string;
  allData: any = [];
  itemsPerPage = 4;
  loading: boolean = false;
  nameFilter: string = '';
  deleteEmployeeDialog: boolean = false;
  EmployeeDialog: boolean = false;
  Employee: any;
  showFormNew: boolean = false;
  createNewForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    position: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    department: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    salary: new FormControl(0, [
      Validators.required,
      Validators.max(999999),
      Validators.min(0),
    ]),
  });
  updateForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    position: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    department: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    salary: new FormControl(0, [
      Validators.required,
      Validators.max(999999),
      Validators.min(0),
    ]),
  });

  ngOnInit() {
    this.endPoint = 'employees';
    this.employeeService.setEndPoint(this.endPoint);

    this.loadData();
  }

  editEmployee(rowData: any) {
    console.log(rowData._id);
    this.employeeService.getById(rowData._id).subscribe({
      next: (res) => {
        console.log(res);
        this.Employee = { ...res };
        this.EmployeeDialog = true;
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      },
    });
  }

  confirmDelete(id: string) {
    this.employeeService.delete(id).subscribe({
      next: () => {
        // close dialog
        this.deleteEmployeeDialog = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Deleted',
          life: 3000,
        });
        this.loadData();

        // load data here
      },
      error: (err) => {
        this.deleteEmployeeDialog = false;

        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.text,
          life: 3000,
        });
        this.loadData();
      },
    });
  }

  addNew(form: FormGroup) {
    this.employeeService.create(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.showFormNew = false;
        // show message for success inserted
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'inserted successfully',
          life: 3000,
        });
        form.reset();

        // load data again
        this.loadData();
      },
      error: (err) => {
        this.showFormNew = false;
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      },
    });
    console.log(form);
  }

  loadData() {
    this.loading = true;

    this.employeeService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.allData = res;
        console.log(res);

        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.EmployeeDialog = false;
  }

  deleteEmployee(Employee: any) {
    this.deleteEmployeeDialog = true;
    this.Employee = { ...Employee };
  }

  saveEmployee(Employee: any, form: FormGroup) {
    this.employeeService.update(form.value, Employee._id).subscribe({
      next: () => {
        this.hideDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'You Edit This Employee Successfully',
          life: 3000,
        });

        // load data again
        this.loadData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      },
    });
  }

  toggleNew() {
    if (this.showFormNew) {
      this.showFormNew = false;
    } else {
      this.showFormNew = true;
    }
  }
  onFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.table.filterGlobal(value, 'contains');
  }
}
