import { Component, OnInit } from '@angular/core';
import { CartInterface } from '../../models/CartInterface';
import { CategoryService } from '../../Service/Category-Service';
import { CartService } from '../../Service/CartService';
import { ProductsFromAPIService } from '../../Service/products-from-api.service';
import { ProductInterface } from '../../models/product-interface';
import { validateHeaderValue } from 'http';
import { ProductOrderService } from '../../Service/ProductOrederService';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  
  /**
   *
   */
  Cart:any=[];
  products:ProductInterface[]=[]
  topProducts:ProductInterface[]=[]
  OrderProducts:any=[]
  TotalPrice:any;
  cartt:any;

  constructor(public CartService:CartService, public productService:ProductsFromAPIService,public productOrderService:ProductOrderService) {
  }
  ngOnInit(): void {
    this.CartService.getCart().subscribe({
      next: (data) => {
        console.log(data);
        this.Cart = data.products;
        this.cartt=data;
        
        console.log (this.cartt);
        this.Cart.forEach((element:CartInterface) => {
          this.productService.getById(element.productId).subscribe({
            next: (value)=>{
              this.OrderProducts.push({productOrder:element,Product:value})
              this.cartt.totalPrice+=value.price;
            },
            error: (error) => {
              console.log(error);
            }
          })
        }
      );
      this.CartService.update(this.cartt.id,this.cartt);

      console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  
  this.productService.getTopRated().subscribe({
    next:(data)=>{
      this.topProducts=data;
    },
    error: (error) => {
      console.log(error);
    }
  });

}

increaseQuantity(product:any){
  if(product.productOrder.quantity<product.Product.quantity){
  product.productOrder.quantity=product.productOrder.quantity+1;
  this.productOrderService.update(product.productOrder).subscribe({
    next:(data)=>{
      //console.log(data);
      product.productOrder=data;
      this.cartt.totalPrice+=product.Product.price;
      this.CartService.update(this.cartt.id,this.cartt).subscribe({
        next:(value)=>{
          console.log(value);
        },
        error: (error) => {
          console.log(error);
        }
      });

    },
    error: (error) => {
      console.log(error);
    }
  });
}
}
decreaseQuantity(product:any){

  if(product.productOrder.quantity>1){
    product.productOrder.quantity=product.productOrder.quantity-1;
    this.productOrderService.update(product.productOrder).subscribe({
      next:(data)=>{
        console.log(data);
        product.productOrder=data;
        this.cartt.totalPrice-=product.Product.price;

        this.CartService.update(this.cartt.id,this.cartt).subscribe({
          next:(value)=>{
            this.cartt=value;
            console.log(value);
          },
          error: (error) => {
            console.log(error);
          }
        });
  
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
Remove(productorder:any){
this.productOrderService.delete(productorder).subscribe({
  next:(data)=>{
    this.OrderProducts = this.OrderProducts.filter((item: any) => item.productOrder !== productorder);

  },
  error: (error) => {
    console.log(error);
  }
});

this.cartt.totalPrice-=productorder.subPrice;
if(this.cartt.totalPrice<0){
  this.cartt.totalPrice=0;
}
this.CartService.update(this.cartt.id,this.cartt).subscribe({
next:(data)=>{
  this.cartt=data;
},error: (error) => {
  console.log(error);
}
});
}
}
