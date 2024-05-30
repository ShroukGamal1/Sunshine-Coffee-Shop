import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
products:ProductInterface[]=[];
existProduct:ProductInterface|undefined;
  constructor() { 
//this.products=ProductList;
  }

  getAll():ProductInterface[]{
    return this.products;
  }

  getById(Id:number):ProductInterface|undefined{
    return this.products.find(p=>p.id==Id);
  }

  DeleteProduct(Id:number){
    this.products = this.products.filter((product) => product.id != Id);
    return this.products;
  }

  AddProduct(product:ProductInterface){
    this.products.push(product);
    return this.products;
  }

  UpdateProduct(Id:number,product:ProductInterface){
    const index = this.products.findIndex(product => product.id === Id);
    this.products[index]=product;
    return this.products;
  }
  


}
