import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp } from '../../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from '../../../services/product/product.service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{
  layout:string = ''
  products: ProductDto[] = [];

  constructor(private messageService: MessageService, private productService: ProductService, private localstorageService: LocalstorageService) { }

  async ngOnInit(): Promise<void> {

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

  addToCard(product: ProductDto){
    this.localstorageService.addToCart(product)
  }

}
