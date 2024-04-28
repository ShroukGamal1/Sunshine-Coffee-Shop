import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductInterface } from '../models/product-interface';
import { ProductList } from '../models/ProductList';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

Products:ProductInterface[]=[];
constructor(){
  this.Products=ProductList;
}
}
