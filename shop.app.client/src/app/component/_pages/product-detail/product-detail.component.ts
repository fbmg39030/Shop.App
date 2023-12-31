import { Component, OnInit } from '@angular/core';
import { ProductDto, ProductImageDto, ProductQp } from '../../../clients/shop-client';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../../services/session/session.service';
import { ProductService } from '../../../services/product/product.service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  currentProductDto!: ProductDto;

  images: any[] | undefined;

  responsiveOptions: any[] | undefined;
  quantityItems = [1, 2, 3, 4];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private productService: ProductService,
    public sessionService: SessionService,
    public localstorageService: LocalstorageService
  ) {}

  async ngOnInit(): Promise<void> {
    this.handleUrlParam();
    this.setupGaleria();
  }

  async handleUrlParam() {
    this.sessionService.isSpinnerLoading = true;

    const urlParam$ = this.route.paramMap.pipe(
      switchMap(async (params) => {
        const loid = params.get('loid');
        return loid;
      })
    );
    const loid = await firstValueFrom(urlParam$);
    if (loid) {
      await this.loadProductByLoid(loid);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Something went wrong',
        detail: 'Invalid parameter in url',
      });
      this.router.navigate(['']);
    }
    this.sessionService.isSpinnerLoading = false;
  }

  async loadProductByLoid(loid: string) {
    const result = await this.productService.loadProductByLoid(loid);
    if (result) this.currentProductDto = result;
    else this.router.navigate(['']);
  }

  setupGaleria() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }
}
