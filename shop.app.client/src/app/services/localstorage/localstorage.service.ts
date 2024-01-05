import { Injectable, OnInit } from '@angular/core';
import { CART_LOCALSTORAGE_KEY } from '../../app-constants';
import { ProductDto } from '../../clients/shop-client';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements OnInit{
  cartLoidList: string[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartLoidList = this.getLoidsInLocalstorage();
  }

  getLoidsInLocalstorage(){
    const result = localStorage.getItem(CART_LOCALSTORAGE_KEY);

    if(result){
      return JSON.parse(result)
    }

    return [];
  }

  addToCart(product: ProductDto){
    if(this.cartLoidList.some(loid => loid == product.logicalObjectId)){
      this.messageService.add({ "severity": "error", "summary": "Duplicate product", "detail":"Product already in cart!"})
      return;
    }
  
    this.cartLoidList.push(product!.logicalObjectId!.toString());
    localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(this.cartLoidList));
    this.messageService.add({ "severity": "success", "summary": "Operation successful", "detail":"Product added successfully!!"})
  }
}
