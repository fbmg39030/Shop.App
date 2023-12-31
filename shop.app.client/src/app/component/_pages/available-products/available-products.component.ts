import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp } from '../../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{
  layout:string = ''
  products: ProductDto[] = [];

  constructor(private productClient: ProductClient, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    const qp :ProductQp=new ProductQp();    
    qp.name1="";

    try {    
      const productsFound = await lastValueFrom(this.productClient.query(qp));
      this.products = productsFound;
      
      this.messageService.add(
        { 
          severity: 'success',
          summary: 'Query successful!',
          detail: 'Products were queried successfully.'
        }
      );
    } catch (error) {
      this.messageService.add(
        { 
          severity: 'error',
          summary: 'Query unsuccessful!',
          detail: 'Something went wrong during the query'
        }
      );
    }
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

}
