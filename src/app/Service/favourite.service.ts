import { AccountService } from './Account-Service';
import { ProductsFromAPIService } from './products-from-api.service';
import { ProdUser } from './../models/ProdUser';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { url } from 'inspector';
import { UserFavProd } from '../models/UserFavProd';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService implements OnInit{

  baseUrl:string = "https://localhost:7225/api/Favourite";
  UserId: string="";
  constructor(private http: HttpClient, private accountService: AccountService) { }
  ngOnInit(): void {

    this.accountService.getTheLoggedInUserId().subscribe({
      next: (data)=>{ }
    })
  }

  
  AddProductToFavourite(userIdProdId: ProdUser){

    return this.http.post(`${this.baseUrl}/favourite`, userIdProdId);
  }

  DeleteFromFav (prodUserIDs: ProdUser){

    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const req = new HttpRequest('DELETE', url, prodUserIDs, { headers: headers });
    return this.http.request(req);

    // const options = {
    //   body: userIdProdId
    // };
    // return this.http.delete(`${this.baseUrl}`, options);

    // const url = `${this.baseUrl}`;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const req = new HttpRequest('DELETE', url, {
    //   body: prodUserIDs,
    //   headers: headers
    // });

    // return this.http.request(req);
  }

  getUserFav(userId: string){
    
    return this.http.get<UserFavProd[]>(`${this.baseUrl}/${userId}`);
  }
}

