import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../../Service/product-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../../../models/product-interface';
import { ProductList } from '../../../models/ProductList';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'node:process';
import { CommonModule } from '@angular/common';
import { ProductsFromAPIService } from '../../../Service/products-from-api.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //titleInvalid: boolean = false;
  //priceInvalid: boolean = false;
  //quantityInvalid: boolean = false;
ProductForm=new FormGroup({
  title :new FormControl("",[Validators.required,Validators.minLength(3)]),
  desc:new FormControl("",Validators.required),
  img:new FormControl("",Validators.required),
  price:new FormControl(0,Validators.min(10)),
  quantity:new FormControl(0,[Validators.required,Validators.min(0)])

});
  productId: any;
  product: any;

  constructor(public productService: ProductsFromAPIService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  get GetTitle(){
     return this.ProductForm.controls['title'];
  }
  get GetPrice(){
    return this.ProductForm.controls['price'];
 }
 get GetQuantity(){
  return this.ProductForm.controls['quantity'];
}
get GetImg(){
  return this.ProductForm.controls['img'];
}
get GetDesc(){
  return this.ProductForm.controls['desc'];
}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.GetTitle.setValue('');
        this.GetDesc.setValue('');
        this.GetImg.setValue('');
        this.GetPrice.setValue(null);
        this.GetQuantity.setValue(null);
      },
    });
    if (this.productId != 0) {
      this.productService.getById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.product=this.product[0];
          this.GetTitle.setValue(this.product.title);
          this.GetPrice.setValue(this.product.price);
          this.GetQuantity.setValue(this.product.quantity);
          this.GetImg.setValue(this.product.img);
          this.GetDesc.setValue(this.product.desc);
        },
      });
  }}

  productOperation() {
    if (this.ProductForm.status == 'VALID') {
      if (this.productId == 0) {
        this.productService.addProduct(this.ProductForm.value).subscribe({
          next: () => {
            this.router.navigate(['/Product/:id/edit']);
          },
        });
      } else {
        this.productService
          .update(this.productId, this.ProductForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/Product/:0/edit']);
            },
          });
      }
    } else {
      console.log('Form inValid');
    }
  }
/*
  validateTitle(event: Event) {
    const titleInputValue: string = (event.target as HTMLInputElement).value;
    this.titleInvalid = titleInputValue.length < 3;
  }

  validatePrice(event: Event) {
    const priceInputValue: number = parseFloat((event.target as HTMLInputElement).value);
    this.priceInvalid = priceInputValue <= 10;
  }

  validateQuantity(event: Event) {
    const quantityInputValue: number = parseFloat((event.target as HTMLInputElement).value);
    this.quantityInvalid = quantityInputValue < 0;
  }*/
}
