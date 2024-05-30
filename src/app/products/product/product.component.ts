import { FavouriteService } from './../../Service/favourite.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Service/CartService';
import { ProductOrderService } from '../../Service/ProductOrederService';
import { OrderInterface } from '../../models/OrderInterface';
import { AccountService } from '../../Service/Account-Service';
import { ProdUser } from '../../models/ProdUser';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AlertComponent } from '../../Component/alert/alert.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @Input() products :any[]=[];
  cart:any;
   order:any;
   UserId: string|undefined;
  //getAverageRating(): number {
    //return this.product.ratings.reduce((sum, rating) => sum + rating, 0) / this.product.ratings.length;
  //}

  /**
   *
   */
  constructor(public cartService:CartService, 
    public productorder:ProductOrderService,
    public FavouriteService: FavouriteService,
    public dialog: MatDialog,
     public accountService:AccountService) {
    
  }
  ngOnInit(): void {
    this.accountService.getTheLoggedInUserId().subscribe({
      next: (data)=>{
        this.UserId = data.userId;
        console.log("userID: "+this.UserId);
      }
    });

  }


  AddtoCart(id:number,price:number){

    this.cartService.getCart().subscribe({
      next:(data)=>{
        this.cart=data;
        var obj={state:'C',checkOutDate:new Date(),totalPrice:price,userId:"dldl"};
        if(this.cart==null){
          this.cartService.add(obj).subscribe({
            next:(data)=>{
              this.order=data;
              console.log(data);
              /*var obj2={productId:id,orderId:this.order.id,quantity:1,subPrice:price};
              this.productorder.add(obj2).subscribe({
                next:(value)=>{

                },
                error(err) {
                  console.log(err);
                },
              });*/
            },
            error(err) {
              console.log(err);

            },
          });
        }
        /*
        else{
          var obj2={productId:id,orderId:this.cart.id,quantity:1,subPrice:price};
              this.productorder.add(obj2).subscribe({
                next:(value)=>{
                  console.log(value);

                },
                error(err) {
                  console.log(err);
                },
              });
            }*/
      },
      error(err) {
        console.log(err);
      }
    });
  }


  openDialog(productId: number) {
      this.dialog.open(AlertComponent, {
        data: {
           productId: productId,
           userId: this.UserId,
           "alertMsg": this.UserId==undefined? "Login First":"add product to favourite",
           }
      });
    
    
  }
}
