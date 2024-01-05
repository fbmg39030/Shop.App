import { Injectable } from '@angular/core';
import { ProductDto, ProductStatus } from '../../clients/shop-client';
import { STATUS_INACTIVE, STATUS_INSTOCK, STATUS_LOWSTOCK, STATUS_OUTOFSTOCK } from '../../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _isSpinnerLoading: boolean = false;
  public get isSpinnerLoading(): boolean {
    return this._isSpinnerLoading;
  }
  public set isSpinnerLoading(value: boolean) {
    this._isSpinnerLoading = value;
  }

  constructor() { }

  
  getStatusName(productDto: ProductDto) {
    if(!productDto) return;

    switch (productDto.status) {
      case ProductStatus._0:
        return STATUS_INSTOCK;

      case ProductStatus._1: 
        return STATUS_LOWSTOCK;

      case ProductStatus._2:
        return STATUS_OUTOFSTOCK;

      case ProductStatus._3: 
        return STATUS_INACTIVE

      default: 
        return NaN;
    }
  }

  getSeverity (product: ProductDto) {
    if(!product) return;
    
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
}
