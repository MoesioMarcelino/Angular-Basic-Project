import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Person } from '../person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;
  peopleColumns: string[] = ['id', 'name', 'country', 'email', 'company'];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople()
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

}
