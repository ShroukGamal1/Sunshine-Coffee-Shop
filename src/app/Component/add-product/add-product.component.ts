import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductInterface } from '../../models/product-interface';
import { ProductServicesService } from '../../Service/product-services.service';
import { RouterLink } from '@angular/router';
import { ProductsFromAPIService } from '../../Service/products-from-api.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  titleInput!: HTMLInputElement;
  priceInput!: HTMLInputElement;
  titleInvalid: boolean = false;
  priceInvalid: boolean = false;
  productList:ProductInterface[]=[];
  
  constructor(public productServices: ProductsFromAPIService) {
        
  }
  ngOnInit(): void {
    this.productServices.getAll().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  delete(id:any){
    this.productServices.delete(id).subscribe({
      next: () => {
        this.productList = this.productList.filter(
          (product) => product.id !=id
        );
        //console.log(this.productList)

      },
      error: () => {},
    });
  }

}

  /*
  addProduct(titleInputValue: string, priceInputValue: string) {
    if (!titleInputValue || !priceInputValue) {
      alert('Please enter both title and price.');
      return;
  }
  const price: number = parseFloat(priceInputValue);
  const existingProduct = this.productList.find(product => product.title === titleInputValue && product.price === price);
  if (existingProduct) {
      alert('Product already exists!');
  } else {
      this.productList.push({ title: titleInputValue, price: price });
  }

  if (this.titleInput && this.priceInput) {
      this.titleInput.value = '';
      this.priceInput.value = '';
  } else {
      console.error('Input elements are not initialized.');
  }
  }

  deleteProduct(product: any) {
    const index = this.productList.findIndex(p => p === product);
    if (index !== -1) {
        this.productList.splice(index, 1);
    }
  }
  validateTitle(event: Event) {
    const titleInputValue: string = (event.target as HTMLInputElement).value;
    this.titleInvalid = titleInputValue.length < 3;
}

validatePrice(event: Event) {
    const priceInputValue: number = parseFloat((event.target as HTMLInputElement).value);
    this.priceInvalid = priceInputValue <= 10;
}
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}
*/
