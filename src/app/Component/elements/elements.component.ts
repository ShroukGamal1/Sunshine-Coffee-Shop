import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [SliderComponent,ProductsComponent],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.css'
})
export class ElementsComponent {

}
