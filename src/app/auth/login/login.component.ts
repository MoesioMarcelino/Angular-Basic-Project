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

    this.authService.login(credentials)
      .subscribe(
        (user) => {
          this.snackBar.open(
            'Logged with sucess! Welcome ' + user.firstname + '!', 'OK', { duration: 3000 }
          );

          this.router.navigateByUrl('/');
        },
        ({ error }) => {
          console.log(error.message);
          this.snackBar.open(
            'User or password is wrong', 'OK', { duration: 3000 }
          );
        }
      );
  }
}
