import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseurl!: string;
  endPoint!: string;

  constructor(private http: HttpClient) {
    this.baseurl = environment.baseurl;
}
setEndPoint(val: string) {
  this.endPoint = val;
}
getAll():Observable<any>
{
  return this.http.get(`${this.baseurl}/${this.endPoint}`);
}
getById(id:string):Observable<any>
{
  return this.http.get(`${this.baseurl}/${this.endPoint}/${id}`);
}
create(body:any):Observable<any>
{
  return this.http.post(`${this.baseurl}/${this.endPoint}`,body)
}
update(body : any , id : string):Observable<any>
{
  return this.http.put(`${this.baseurl}/${this.endPoint}/${id}`,body)
}
delete(id : string )
{
  return this.http.delete(`${this.baseurl}/${this.endPoint}/${id}`) ;
}
}
