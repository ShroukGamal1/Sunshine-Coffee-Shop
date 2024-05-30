import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInterface } from '../models/Login-interface';
@Injectable({
    providedIn: 'root'
  })
  export class AccountService {
   baseUrl:string ='https://localhost:7225/api/Account/'
    constructor(private http:HttpClient) { }

    getAll():Observable<LoginInterface[]>{
      return this.http.get<LoginInterface[]>(this.baseUrl);
    }
    getById(id:string){
      return this.http.get(`${this.baseUrl}${id}`);
    }
  
    Login(user:any){
      return this.http.post<any>(`${this.baseUrl}LogIn`,user);
    }
    Register(user:any){
      return this.http.post<any>(`${this.baseUrl}`,user);
    }

    //-------------------------------------------------------

    getTheLoggedInUserId(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<any>(`${this.baseUrl}GettheLoggedInUserId`, { headers });
    }
  
  }