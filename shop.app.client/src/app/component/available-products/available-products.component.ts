import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductDto, ProductQp } from '../../clients/shop-client'
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{

  constructor(private productClient: ProductClient, private http: HttpClient) {  
  }

  async ngOnInit(): Promise<void> {
    const qp :ProductQp=new ProductQp();    
    qp.name1="";
    try {    
      const test = await lastValueFrom(this.productClient.query(qp))
      console.log(test)
    } catch (error) {
      console.log(error)
    }
  }

}
