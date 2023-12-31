import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  productsToShow=[];

  constructor(private localstorageService: LocalstorageService) {}

    ngOnInit(): void {
      this.productsToShow = this.localstorageService.getLoidsInLocalstorage();
    }
}
