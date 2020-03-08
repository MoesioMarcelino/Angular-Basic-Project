import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(authReq)
        .pipe(
          catchError( (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
                this.snackBar.open(error.error.message, 'OK', { duration: 5000 });
              }
            }
            return throwError(error);
          })
        );
    }


    return next.handle(req);
  }
}
