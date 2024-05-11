import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductInterface } from '../models/product-interface';
import { ProductsFromAPIService } from '../Service/products-from-api.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

Products:ProductInterface[]=[];
constructor(public service:ProductsFromAPIService){
  this.service.getAll().subscribe({
    next: (data) => {
      this.Products = data;
    },
    error: (error) => {
      console.log(error);
    },
  });
}
}
