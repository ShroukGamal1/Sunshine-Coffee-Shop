import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../Service/CartService';
import { ProductOrderService } from '../../Service/ProductOrederService';
import { OrderInterface } from '../../models/OrderInterface';
import { AccountService } from '../../Service/Account-Service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() products :any[]=[];
  cart:any;
   order:any;
  //getAverageRating(): number {
    //return this.product.ratings.reduce((sum, rating) => sum + rating, 0) / this.product.ratings.length;
  //}

  /**
   *
   */
  constructor(public cartService:CartService, public productorder:ProductOrderService, public accountService:AccountService) {
    
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

  addToFav(productId:any){

    this.accountService.getTheLoggedInUserId().subscribe({
      next: (data)=>{console.log("success"); console.log(data)},
      error: (error)=>{console.log("error"); console.log(error);},
    });
}}
