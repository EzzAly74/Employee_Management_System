import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path:"",
        component:EmployeeComponent},
    {
    path:"employee",
    component:EmployeeComponent
    },
    {
        path : "**",
        component : NotFoundComponent
    }
];
