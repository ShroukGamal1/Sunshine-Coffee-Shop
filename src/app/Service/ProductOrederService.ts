import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../models/Category-Interface';
import { CartInterface } from '../models/CartInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
 baseUrl:string ='https://localhost:7225/api/Cart/'
  constructor(private http:HttpClient) { }
  getAll():Observable<CartInterface[]>{
return this.http.get<CartInterface[]>(this.baseUrl);
  }
  getById(id:number){
    return this.http.get(`${this.baseUrl}${id}`);
  }
  update(product:any){
    return this.http.put(`${this.baseUrl}update`,product);
  }
  delete(id:number){
    return this.http.delete(`${this.baseUrl}id?id=${id}`);
  }
  addProduct(product:any){
    return this.http.post(`${this.baseUrl}product`,product);
  }


}
