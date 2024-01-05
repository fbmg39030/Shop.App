import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp, ProductStatus } from '../../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from '../../../services/product/product.service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.scss'
})
export class AvailableProductsComponent implements OnInit{
  layout:string = ''
  products: ProductDto[] = [];

  constructor(private messageService: MessageService, private productService: ProductService, 
              private localstorageService: LocalstorageService, private router: Router,
              public sessionService: SessionService) { }

  async ngOnInit(): Promise<void> {
    this.sessionService.isSpinnerLoading = true;
    
    const qp :ProductQp=new ProductQp();    
    this.products = await this.productService.queryProducts(qp) ?? [];

    this.sessionService.isSpinnerLoading = false;
  }

  addToCard(product: ProductDto){
    this.localstorageService.addToCart(product)
  }

  navigateToDetail(product: ProductDto) {
    this.router.navigate(["product-detail", { loid: product.logicalObjectId }]);
  }

}
