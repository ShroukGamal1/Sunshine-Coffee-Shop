import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../../Service/product-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../../../models/product-interface';
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

ProductForm=new FormGroup({
  name :new FormControl("",[Validators.required,Validators.minLength(3)]),
  description:new FormControl("",Validators.required),
  image:new FormControl(""),
  price:new FormControl(0,Validators.min(10)),
  rating :new FormControl(0,Validators.min(0)),
  quantity:new FormControl(0,[Validators.required,Validators.min(0)])

});
  productId: any;
  product: any;

  constructor(public productService: ProductsFromAPIService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  get GetTitle(){
     return this.ProductForm.controls['name'];
  }
  get GetRating(){
    return this.ProductForm.controls['rating'];
 }
  get GetPrice(){
    return this.ProductForm.controls['price'];
 }
 get GetQuantity(){
  return this.ProductForm.controls['quantity'];
}
get GetImg(){
  return this.ProductForm.controls['image'];
}
get GetDesc(){
  return this.ProductForm.controls['description'];
}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.GetTitle.setValue('');
        this.GetDesc.setValue('');
        this.GetImg.setValue(null);
        this.GetPrice.setValue(null);
        this.GetRating.setValue(null);
        this.GetQuantity.setValue(null);
      },
    });
    if (this.productId != 0) {
      this.productService.getById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          //this.product=this.product[0];
          this.GetTitle.setValue(this.product.name);
          this.GetPrice.setValue(this.product.price);
          this.GetQuantity.setValue(this.product.quantity);
         // this.GetImg.setValue(this.product.image);
          this.GetRating.setValue(this.product.rating);
          this.GetDesc.setValue(this.product.description);
        },
      });
  }}
  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }

  }
  productOperation() {
    if (this.ProductForm.status == 'VALID') {
      if (this.productId == 0) {
        var obj2={
          name :this.ProductForm.value.name,
          description:this.ProductForm.value.description,
          image:this.imageUrl,
          price:this.ProductForm.value.price,
          rating :this.ProductForm.value.rating,
          quantity:this.ProductForm.value.quantity
        
        };
        this.productService.addProduct(obj2).subscribe({
          next: () => {
            this.router.navigate(['/Product/:id/edit']);
          },
        });
      } else {
        var obj={
          id:this.productId,
          name :this.ProductForm.value.name,
          description:this.ProductForm.value.description,
          image:this.imageUrl,
          price:this.ProductForm.value.price,
          rating :this.ProductForm.value.rating,
          quantity:this.ProductForm.value.quantity
        
        };
        this.productService
          .update(this.productId, obj)
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
