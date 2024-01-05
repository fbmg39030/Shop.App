import { Component, OnInit } from '@angular/core';
import {
  AddProductImageRequest,
  ProductAddOrUpdateRequest,
  ProductClient,
  ProductStatus,
} from '../../../clients/shop-client';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../../services/session/session.service';
import { STATUS_INACTIVE, STATUS_INSTOCK, STATUS_LOWSTOCK, STATUS_OUTOFSTOCK } from '../../../app-constants';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss',
})
export class DataManagementComponent implements OnInit {
  productName: string = '';
  productPrice: string = '';
  productDescription: string = '';
  productTag: string = '';
  selectedStatus: ProductStatusDisplay | undefined;
  techDetails: { [key: string]: string } | undefined = {};
  fileList: File[] = [];

  statusOptions: ProductStatusDisplay[] = [];

  constructor(
    private productClient: ProductClient,
    private messageService: MessageService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.statusOptions = [
      { name: STATUS_INSTOCK, code: ProductStatus._0 },
      { name: STATUS_LOWSTOCK, code: ProductStatus._1 },
      { name: STATUS_OUTOFSTOCK, code: ProductStatus._2 },
      { name: STATUS_INACTIVE, code: ProductStatus._3 },
    ];
  }

  public async submit() {
    this.sessionService.isSpinnerLoading = true;

    let request = new ProductAddOrUpdateRequest();
    request.name1 = this.productName;
    request.description = this.productDescription;
    request.price = +this.productPrice;
    request.tag = this.productTag;
    request.status = this.selectedStatus ? this.selectedStatus.code : ProductStatus._0;
    request.techDetails = this.techDetails;
    request.imageRequests = await this.createImageRequestList();

    try {
      const result = await lastValueFrom(this.productClient.addOrUpdate(request));
      if (result != null) {
        this.messageService.add({
          severity: 'success',
          summary: 'Added successfully!',
          detail: 'Operation was successful!',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'An error occurred',
        detail: 'Adding product was not possible!',
      });
    } finally {
      this.sessionService.isSpinnerLoading = false;
      // this.clearFields();
    }
  }

  async createImageRequestList() {
    return await Promise.all(
      this.fileList.map(async (file) => {
        const request = new AddProductImageRequest();
        request.name = file.name;
        request.version = 1;
        request.mimeType = file.type;

        const base64String = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result?.toString().split(',')[1] ?? '');
          reader.readAsDataURL(file);
        });

        request.bytes = base64String;
        return request;
      })
    );
  }

  clearFields() {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = '';
    this.productTag = '';
    this.selectedStatus = undefined;
    this.fileList = [];
  }

  //converts map entries from table to request excepted params
  updateDictionary($event: { [key: string]: string }[] | undefined) {
    if (!$event) return;
    this.techDetails = $event.reduce((acc, obj) => {
      acc[obj['key']] = obj['value'];
      return acc;
    }, {} as { [key: string]: string });
  }

  onUpload(event: FileUploadEvent) {
    console.log(event);
    this.fileList = event.files;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded, proceed with request' });
  }
}

export class ProductStatusDisplay {
  name: string = '';
  code: ProductStatus | undefined;
}
