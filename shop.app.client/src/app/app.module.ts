import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductClient, SHOP_API_BASE_URL } from './clients/shop-client';
import { AvailableProductsComponent } from './component/available-products/available-products.component';
import { HeaderComponent } from './component/header/header.component';

//primeng imports
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CartComponent } from './component/cart/cart.component';
import { DataManagementComponent } from './component/data-management/data-management.component';


@NgModule({
  declarations: [
    AppComponent,
    AvailableProductsComponent,
    HeaderComponent,
    CartComponent,
    DataManagementComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    ButtonModule,
    MenubarModule,
    AppRoutingModule,
  ],
  providers: [ 
    {provide: SHOP_API_BASE_URL, useValue: "http://localhost:8080" },
     ProductClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
