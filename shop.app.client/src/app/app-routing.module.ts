import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableProductsComponent } from './component/available-products/available-products.component';

const routes: Routes = [ 
  { path: "", component: AvailableProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
