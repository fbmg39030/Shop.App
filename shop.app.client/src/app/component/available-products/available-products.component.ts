import { Component, OnInit } from '@angular/core';
import { ProductClient, ProductQp } from '../../clients/shop-client'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-available-products',
  templateUrl: './available-products.component.html',
  styleUrl: './available-products.component.css'
})
export class AvailableProductsComponent implements OnInit{

  constructor(private productClient: ProductClient) {  
  }

  async ngOnInit(): Promise<void> {
    const qp :ProductQp=new ProductQp();
    const test = await lastValueFrom(this.productClient.query(qp))
    console.log(test)
  }

}
