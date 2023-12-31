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
    const test = await lastValueFrom(this.updateHero(qp));
    
    // console.log("Test")
    // qp.name1="";
    // try {    
    //   // const test = await lastValueFrom(this.productClient.query(qp))
    //   // console.log(test)
    //   this.http.post<ProductQp>("http://localhost:8080/api/Product/Query", qp, httpOptions);
    // } catch (error) {
    //   console.log(error)
    // }
  }

  updateHero(qp: ProductQp): Observable<ProductDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
        // Authorization: 'my-auth-token'
      })
    };

    return this.http.post<ProductDto[]>("https://localhost:8081/api/Product/Query", qp, httpOptions)
      .pipe(
        catchError(error=> this.handleError(error))
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
