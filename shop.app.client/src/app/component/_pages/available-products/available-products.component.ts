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

  constructor(private productClient: ProductClient, private messageService: MessageService) { 
    var productDto = new ProductDto();
    productDto.name1 = "Test"
    productDto.description = "TestDescription"
    productDto.price = 54.2
    this.products.push(productDto) 
    this.products.push(productDto) 
    this.products.push(productDto) 
    this.products.push(productDto) 
  }

  async ngOnInit(): Promise<void> {
    const qp :ProductQp=new ProductQp();    
    qp.name1="";
    try {    
      const test = await lastValueFrom(this.productClient.query(qp))
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
