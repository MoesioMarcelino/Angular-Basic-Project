import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Person } from '../person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;
  peopleColumns: string[] = ['id', 'name', 'country', 'email', 'company'];
  loading = false;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loading = true;
    this.people$ = this.personService.getPeople()
      .pipe(
        catchError((err => {
          this.loading = false;
          console.error(err);
          return throwError(err);
        })),
        tap(() => this.loading = false)
      );
  }

}
