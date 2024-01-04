import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductClient, SHOP_API_BASE_URL } from './clients/shop-client';
import { AvailableProductsComponent } from './component/_pages/available-products/available-products.component';
import { HeaderComponent } from './component/header/header.component';
import { DataManagementComponent } from './component/_pages/data-management/data-management.component';
import { ProductDetailComponent } from './component/_pages/product-detail/product-detail.component';
import { ProductService } from './services/product/product.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { TechnicalDetailsTableComponent } from './component/technical-details-table/technical-details-table.component';

//primeng imports
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CartComponent } from './component/_pages/cart/cart.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarButtonComponent } from './component/sidebar-button/sidebar-button.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    AvailableProductsComponent,
    HeaderComponent,
    CartComponent,
    DataManagementComponent,
    SideBarComponent,
    SidebarButtonComponent,
    ProductDetailComponent,
    TechnicalDetailsTableComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    AppRoutingModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    DataViewModule,
    TagModule,
    RatingModule,
    ProgressSpinnerModule,
    DropdownModule,
    TooltipModule,
    GalleriaModule,
    TableModule
  ],
  providers: [ 
    { provide: SHOP_API_BASE_URL, useValue: "https://localhost:8081" },
     ProductClient,
     MessageService,
     ProductService,
     LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
