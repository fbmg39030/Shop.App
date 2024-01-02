import { Injectable } from '@angular/core';
import { ProductClient, ProductDto, ProductQp } from '../../clients/shop-client';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productClient: ProductClient, private messageService: MessageService) { }

  async queryProducts(qp: ProductQp): Promise<ProductDto[] | undefined>{
    try {    
      const productsFound = await lastValueFrom(this.productClient.query(qp));
      return productsFound;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Query unsuccessful!', detail: 'Something went wrong during the query'});
      return undefined;
    }
  }

  async loadProductByLoid(loid: string): Promise<any> {
    let productQp = new ProductQp();
    productQp.logicalObjectId = loid;

    try {
      const result = await firstValueFrom(this.productClient.query(productQp));
      if(result) return result[0];
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Query unsuccessful!', detail: 'Something went wrong during the query'});
    }
    return undefined;
  }
}
