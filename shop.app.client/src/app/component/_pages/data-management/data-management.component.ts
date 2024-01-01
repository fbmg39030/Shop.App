import { Component } from '@angular/core';
import { ProductAddOrUpdateRequest, ProductClient, ProductStatus } from '../../../clients/shop-client';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss'
})
export class DataManagementComponent {
  productName: string = "";
  productPrice: string = "";
  productDescription: string = "";
  productTag: string = "";
  selectedStatus: ProductStatus = ProductStatus._0;

  statusOptions = Object.values(ProductStatus);

  constructor(private productClient: ProductClient, private messageService: MessageService,
              private sessionService: SessionService) {  }

  public async submit(){
    this.sessionService.isSpinnerLoading = true; 
    let request = new ProductAddOrUpdateRequest();
    request.name1 = this.productName;
    request.description = this.productName;
    request.price = +this.productPrice;
    request.tag = this.productTag;
    request.status = ProductStatus._0;
    
    try {
      const result = await lastValueFrom(this.productClient.addOrUpdate(request));
      if(result!=null){
        this.messageService.add({"severity":"success", "summary":"Added successfully!", "detail":"Operation was successful!"})
      }
    } catch (error) {
      this.messageService.add({"severity":"error", "summary":"An error occurred", "detail":"Adding product was not possible!"})
    } finally{
      this.sessionService.isSpinnerLoading = false;
      // this.clearFields();
    }

  }
  clearFields() {
    this.productName = "";
    this.productDescription = "";
    this.productPrice = "";
    this.productTag = "";
    this.selectedStatus = ProductStatus._0;
  }
}
