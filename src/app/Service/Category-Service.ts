import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../models/Category-Interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 baseUrl:string ='https://localhost:7225/api/Category/'
  constructor(private http:HttpClient) { }
  getAll():Observable<CategoryInterface[]>{
return this.http.get<CategoryInterface[]>(this.baseUrl);
  }
  getById(id:number){
    return this.http.get(`${this.baseUrl}${id}`);
  }
  update(id:number,product:any){
    return this.http.put(`${this.baseUrl}${id}`,product);
  }
  delete(id:number){
    return this.http.delete(`${this.baseUrl}id?id=${id}`);
  }
  addProduct(product:any){
    return this.http.post(`${this.baseUrl}product`,product);
  }


}
