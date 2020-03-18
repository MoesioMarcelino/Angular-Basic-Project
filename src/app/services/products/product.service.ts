import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from 'src/app/main/product';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3333/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.url}/new`, product)
      .pipe(
        tap(() => {
          this.authService.isAuthenticated();
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
