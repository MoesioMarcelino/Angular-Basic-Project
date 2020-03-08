import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credentials = this.loginForm.value;

    this.loading = true;

    this.authService.login(credentials)
      .subscribe(
        (user) => {
          this.snackBar.open(
            'Logged with sucess! Welcome ' + user.firstname + '!', 'OK', { duration: 5000 }
          );

          this.router.navigateByUrl('/');
          this.loading = false;
        },
        ({status, error}) => {
          console.error(error.message);

          if (status >= 500) {
            this.snackBar.open(
              'Server is offline, try again later in some moments', 'OK', { duration: 5000 }
              );
            this.loading = false;
          }

          this.snackBar.open(
            error.message, 'OK', { duration: 5000 }
            );

          this.loading = false;
        }
      );
  }
}
