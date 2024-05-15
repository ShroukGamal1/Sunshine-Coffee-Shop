import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFromAPIService {
 baseUrl:string ='https://localhost:7225/api/Product/'
  constructor(private http:HttpClient) { }
  getAll():Observable<ProductInterface[]>{
return this.http.get<ProductInterface[]>(this.baseUrl);
  }
  getById(id:number){
    return this.http.get<ProductInterface>(`${this.baseUrl}${id}`);
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
  getProducts(id:number):Observable<ProductInterface[]>{
    return this.http.get<ProductInterface[]>(`${this.baseUrl}GetProductsperCategory/${id}`);
      }

  getTopRated(){
    return this.http.get<ProductInterface[]>(`${this.baseUrl}Get3TopRatedProducts`);
  }

}
