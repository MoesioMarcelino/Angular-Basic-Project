import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../product';
import { ProductService } from 'src/app/services/products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  formAddProduct = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    department: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0)]],
  })

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const product: Product = { ...this.formAddProduct.value }
    
    this.productService.createProduct(product)
      .subscribe(
        (product) => {
          this.snackBar.open(
            'Product created with success', 'OK', { duration: 5000 }
          );

          this.router.navigateByUrl('/main/products');
        },
        ({ status, error }) => {
          console.error(error.message);

          if (status >= 500) {
            this.snackBar.open(
              'Server is offline, try again in some moments', 'OK', { duration: 5000 }
            );
          }

          this.snackBar.open(
            error.message, 'OK', { duration: 5000 }
          );
        } 
      )
  }

}
