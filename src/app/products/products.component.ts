import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductInterface } from '../models/product-interface';
import { ProductsFromAPIService } from '../Service/products-from-api.service';
//import { CategoryInterface } from '../models/Category-Interface';
import { CategoryService } from '../Service/Category-Service';
import { CategoryInterface } from '../models/Category-Interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

Products:ProductInterface[]=[];
Categories:CategoryInterface[]=[];
CategoryId:number=0;
constructor(public service:ProductsFromAPIService,public CategoryService:CategoryService){
}
  
ngOnInit(): void{
  this.CategoryService.getAll().subscribe({
    next:(data)=>{
      this.Categories=data;
      console.log(this.Categories);
    },
    error: (error) => {
      console.log(error);
    },
  });
}

handleClick(categoryId: number) {

  if (categoryId==0){
    this.service.getAll().subscribe({
      next: (data) => {
        this.Products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }else if(categoryId!=0){
    this.service.getProducts(categoryId).subscribe({
      next:(data)=>{
        this.Products=data;
      },
      error: (error) => {
        console.log(error);
      },
    })

  }
}
}
