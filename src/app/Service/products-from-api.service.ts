import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFromAPIService {
 baseUrl:string ='http://localhost:3005/Products'
  constructor(private http:HttpClient) { }
  getAll():Observable<ProductInterface[]>{
return this.http.get<ProductInterface[]>(this.baseUrl);
  }
  getById(id:number){
    return this.http.get(`${this.baseUrl}?id=${id}`);
  }
  update(id:number,product:any){
    return this.http.put(`${this.baseUrl}/${id}`,product);
  }
  delete(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  addProduct(product:any){
    return this.http.post(this.baseUrl,product);
  }

}
