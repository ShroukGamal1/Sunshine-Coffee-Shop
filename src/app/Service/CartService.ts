import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { OrderInterface } from "../models/OrderInterface";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
   baseUrl:string ='https://localhost:7225/api/Order/'
    constructor(private http:HttpClient) { }
    getAll():Observable<OrderInterface[]>{
  return this.http.get<OrderInterface[]>(this.baseUrl);
    }
    getById(id:string){
      return this.http.get(`${this.baseUrl}${id}`);
    }
    getCart(){
        const headers= new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          });
        return this.http.get<any>(`${this.baseUrl}GetOrderOfUser`,{headers});
    }
    update(id:number,Order:any){
      return this.http.put(`${this.baseUrl}update?id=${id}`,Order);
    }
    add(obj:any) :Observable<any>{
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      });
      return this.http.post(`${this.baseUrl}order`,{ headers: headers,body:obj});
    }

    remove(){
      
    }
    
  
  }