import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp, ProductStatus } from '../../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from '../../../services/product/product.service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{
  layout:string = ''
  products: ProductDto[] = [];

  constructor(private messageService: MessageService, private productService: ProductService, 
              private localstorageService: LocalstorageService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    const qp :ProductQp=new ProductQp();    
    this.products = await this.productService.queryProducts(qp) ?? [];
  }

  getSeverity (product: ProductDto) {
    switch (product.status) {
        case ProductStatus._0:
            return 'success';

        case ProductStatus._1:
            return 'warning';

        case ProductStatus._2:
            return 'danger';

        default:
            return 'danger';
    }
  };

  addToCard(product: ProductDto){
    this.localstorageService.addToCart(product)
  }

  navigateToDetail(product: ProductDto) {
    this.router.navigate(["product-detail", { loid: product.logicalObjectId }]);
  }

}
