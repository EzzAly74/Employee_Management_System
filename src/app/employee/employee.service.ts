import { Injectable } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService {

  constructor(http:HttpClient) {
    super(http) ;
   }
}
