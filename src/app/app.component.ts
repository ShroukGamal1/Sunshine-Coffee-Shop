import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { SliderComponent } from './Component/slider/slider.component';
import { ElementsComponent } from './Component/elements/elements.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './Component/footer/footer.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { ProductdetailsComponent } from './Component/productdetails/productdetails.component';
import { CommonModule } from '@angular/common';
import { GallaryComponent } from './Component/gallary/gallary.component';
import { ProductcounterComponent } from './Component/productcounter/productcounter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SliderComponent,ElementsComponent,ProductsComponent,AddProductComponent,ProductdetailsComponent,FooterComponent,CommonModule,GallaryComponent,ProductcounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sunshine';
  pagetitle:string='shrouk';
  Show(event:any){
    this.pagetitle=event;
    console.log(this.pagetitle);

  }
}
