import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableProductsComponent } from './component/_pages/available-products/available-products.component';
import { CartComponent } from './component/_pages/cart/cart.component';
import { DataManagementComponent } from './component/_pages/data-management/data-management.component';

const routes: Routes = [ 
  { path: "", component: AvailableProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "data-management", component: DataManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
