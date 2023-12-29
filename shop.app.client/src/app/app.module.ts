import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SHOP_API_BASE_URL } from './clients/shop-client';
import { AvailableProductsComponent } from './component/available-products/available-products.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailableProductsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [ {provide: SHOP_API_BASE_URL, useValue: "https://localhost:7058" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
