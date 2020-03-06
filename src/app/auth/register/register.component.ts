import { Uf } from './../../uf';
import { Observable, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UfService } from 'src/app/uf.service';
import { tap,  } from 'rxjs/operators';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    firstname: ['', [ Validators.required]],
    lastname: ['', [ Validators.required]],
    address: ['', [ Validators.required]],
    city: ['', [ Validators.required]],
    state: ['', [ Validators.required]],
    phone: ['', [ Validators.required]],
    cellphone: ['', [ Validators.required]],
    email: ['', [ Validators.required, Validators.email]],
    password1: ['', [ Validators.required, Validators.minLength(6)]],
    password2: ['', [ Validators.required, Validators.minLength(6)]],
  }, {
    validator: this.matchingPasswords
  });

  states$: Observable<Uf[]>;

  constructor(
    private fb: FormBuilder,
    private ufService: UfService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.states$ = this.ufService.getUf()
      .pipe(
        tap( state => {
          if (state === null) {
            return throwError(state);
          }
        })
      );
  }

  matchingPasswords(fg: FormGroup) {
    if (fg) {
      const password1 = fg.controls[`password1`].value;
      const password2 = fg.controls[`password2`].value;

      if (password1 === password2) {
        return null;
      }
    }

    return { matching: false };
  }

  onSubmit() {
    const user: User = {
      ...this.formRegister.value, password: this.formRegister.value.password1
    };

    this.authService.register(user)
      .subscribe(
        (sucess) => {
          this.snackBar.open(
            'User save! Use your credentials to log in', 'OK', { duration: 3000 }
          );

          this.router.navigateByUrl('/auth/login');
        },
        ({ error }) => {
          console.error(error);
          this.snackBar.open(
            error.message, 'OK', { duration: 3000 }
          );
        }
      );
  }

}
