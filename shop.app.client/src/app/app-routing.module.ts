import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableProductsComponent } from './component/available-products/available-products.component';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [ 
  { path: "", component: AvailableProductsComponent },
  { path: "cart", component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
