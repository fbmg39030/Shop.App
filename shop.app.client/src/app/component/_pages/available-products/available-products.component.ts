import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp } from '../../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{
  layout:string = ''
  products: ProductDto[] = [];
  cartLoidList: string[] = [];
  cartLocalstorageKey: string = "CART_ITEMS";

  constructor(private messageService: MessageService, private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    this.readLoidsFromLocalstorage();

    const qp :ProductQp=new ProductQp();    
    this.products = await this.productService.queryProducts(qp) ?? [];
  }
  getSeverity (product: ProductDto) {
    switch (product.name1) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return 'danger';
    }
  };

  readLoidsFromLocalstorage(){
    const result = localStorage.getItem(this.cartLocalstorageKey);

    if(result){
      this.cartLoidList = JSON.parse(result)
    }
  }

  addToCard(product: ProductDto){
    if(this.cartLoidList.some(loid => loid == product.logicalObjectId)){
      this.messageService.add({ "severity": "error", "summary": "Duplicate product", "detail":"Product already in cart!"})
      return;
    }
  
    this.cartLoidList.push(product!.logicalObjectId!.toString());
    localStorage.setItem(this.cartLocalstorageKey, JSON.stringify(this.cartLoidList));
    this.messageService.add({ "severity": "success", "summary": "Operation successful", "detail":"Product added successfully!!"})
  }

}
