import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../models/product-interface';
import { ProductList } from '../../models/ProductList';
import { ProductServicesService } from '../../Service/product-services.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsFromAPIService } from '../../Service/products-from-api.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {
  products :ProductInterface[]=[]
  selectedProduct: any = null;
  product:any;
  mySub :any;
productid=0;
  constructor(public ProductService:ProductsFromAPIService,public activatedRoute:ActivatedRoute){
    this.products=ProductList;
  }
  ngOnInit(): void {
    this.productid = this.activatedRoute.snapshot.params['id'];
    this.mySub = this.ProductService.getById(this.productid).subscribe({
      next: (data) => {
        this.product = data;
        this.product=this.product[0];
        console.log(this.product)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

 /* onSelectProduct(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    this.selectedProduct = this.products[selectedIndex - 1];
  }*/
}
