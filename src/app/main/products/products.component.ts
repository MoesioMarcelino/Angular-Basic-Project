import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { MainService } from '../main.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  productsColumn = ['id', 'name', 'department', 'price'];
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productService.getProducts()
      .pipe(
        catchError((err) => {
          console.error(err);
          this.loading = false;
          return throwError(err);
        })
      );

    this.loading = false;
  }

}
