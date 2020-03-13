import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from './../../person';
import { PersonService } from './../../../services/person.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  formAddPerson = this.fb.group({
    firstname: ['', [ Validators.required, Validators.minLength(3)]],
    lastname: ['', [ Validators.required, Validators.minLength(3)]],
    country: ['', [ Validators.required, Validators.minLength(3)]],
    email: ['', [ Validators.required, Validators.email]],
    company: ['', [ Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.formAddPerson.value.firstname + this.formAddPerson.value.lastname;
    const person: Person = {
      ...this.formAddPerson.value, name
    }

    this.personService.createPerson(person)
      .subscribe(
        (pessoa) => {
          this.snackBar.open(
            pessoa.name + ' created with success!', 'OK', { duration: 5000 }
          );

          this.router.navigateByUrl('/main/people');
        },
        ({ status, error }) => {
          console.error(error.message);

          if (status >= 500) {
            this.snackBar.open(
              'Server is offline, try again is some moments', 'OK', { duration: 5000}
            );
          }

          this.snackBar.open(
            error.message, 'OK', { duration: 5000 }
          );
        }
      )
  }
}
