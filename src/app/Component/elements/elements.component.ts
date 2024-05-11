import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ProductsComponent } from '../../products/products.component';
import { GallaryComponent } from '../gallary/gallary.component';
import { ProductcounterComponent } from '../productcounter/productcounter.component';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [SliderComponent,ProductsComponent,GallaryComponent,ProductcounterComponent],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.css'
})
export class ElementsComponent {

}
