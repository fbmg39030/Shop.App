import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductClient, SHOP_API_BASE_URL } from './clients/shop-client';
import { AvailableProductsComponent } from './component/available-products/available-products.component';
import { HeaderComponent } from './component/header/header.component';
import { DataManagementComponent } from './component/data-management/data-management.component';

//primeng imports
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CartComponent } from './component/cart/cart.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { SideBarComponent } from './component/side-bar/side-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    AvailableProductsComponent,
    HeaderComponent,
    CartComponent,
    DataManagementComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    AppRoutingModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    FileUploadModule
  ],
  providers: [ 
    {provide: SHOP_API_BASE_URL, useValue: "http://localhost:8080" },
     ProductClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
