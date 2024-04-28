import { Routes } from '@angular/router';
import { ProductdetailsComponent } from './Component/productdetails/productdetails.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { Component } from '@angular/core';
import { ElementsComponent } from './Component/elements/elements.component';
import { ProductFormComponent } from './Component/add-product/product-form/product-form.component';

export const routes: Routes = [
    {path:"",component:ElementsComponent},
    {path:"Product/:id",component:ProductdetailsComponent},
        {path:"Product/:id/edit",component:AddProductComponent},
        {path:"Product/:id/add",component:ProductFormComponent},
        {path:"Product/:id/details",component:ProductdetailsComponent}

];
