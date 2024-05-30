import { ProdUser } from './../../models/ProdUser';
import { ProductServicesService } from './../../Service/product-services.service';
import { FavouriteService } from './../../Service/favourite.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsFromAPIService } from '../../Service/products-from-api.service';
import { AccountService } from '../../Service/Account-Service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserFavProd } from '../../models/UserFavProd';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

    UserId: string = "";
    UserFavProd: UserFavProd[] = [];

    constructor(private favouriteService: FavouriteService, private accountService: AccountService){
      console.log("heloo from fav.................")
  }


  ngOnInit(): void {
    this.accountService.getTheLoggedInUserId().subscribe({
      next: (data)=>{
        this.UserId = data.userId;
        // this.getUserFavProd();
        console.log(`the user id: ${this.UserId}`);
        this.getUserFavProd();
      }
    });
    
  }

  getUserFavProd(){
    this.favouriteService.getUserFav(this.UserId).subscribe({
      next: (data:UserFavProd[])=>{console.log("success"); console.log(data); this.UserFavProd = data},
      error: (error)=>{console.log("erorrrr"); console.log(error)}
    })
  }

  deleteProdFormFav(prodId: number){
    const ProdUserObj: ProdUser = {
      productId: prodId,
      userId: this.UserId,
    };

    this.UserFavProd = this.UserFavProd.filter((product) => product.productId != prodId);
    console.log(this.UserFavProd);

    this.favouriteService.DeleteFromFav(ProdUserObj).subscribe({
      next: (data)=>{
        console.log("doneeeeee");
      },
      error: (error)=>{console.log("erorrrrrr", error);},
    });
  }
}
