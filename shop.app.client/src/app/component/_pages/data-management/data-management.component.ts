import { Component } from '@angular/core';
import { ProductAddOrUpdateRequest, ProductClient } from '../../../clients/shop-client';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.css'
})
export class DataManagementComponent {
  productName: string = "";
  productPrice: string = "";
  productDescription: string = "";

  constructor(private productClient: ProductClient, private messageService: MessageService) {  }

  public async submit(){
    let request = new ProductAddOrUpdateRequest();
    request.name1 = this.productName;
    request.description = this.productName;
    request.price = +this.productPrice;
    
    try {
      const result = await lastValueFrom(this.productClient.addOrUpdate(request));
      if(result!=null){
        this.messageService.add({"severity":"success", "summary":"Added successfully!", "detail":"Operation was successful!"})
      }
    } catch (error) {
      this.messageService.add({"severity":"error", "summary":"An error occurred", "detail":"Adding product was not possible!"})
    }
  }
}
