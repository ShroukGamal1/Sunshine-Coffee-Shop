import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../models/product-interface';
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
  productId:any;
  mySub :any;
productid=0;
  constructor(public ProductService:ProductsFromAPIService,public activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
     
      },
    });
    if (this.productId != 0) {
      this.ProductService.getById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          //this.product=this.product[0];
        
         // this.GetImg.setValue(this.product.image);
        
        },
      });
  }}

 /* onSelectProduct(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    this.selectedProduct = this.products[selectedIndex - 1];
  }*/
}
