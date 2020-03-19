import { AuthService } from './../auth/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Person } from '../main/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly url = 'http://localhost:3333/people';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getPeople(limit): Observable<Person[]> {
    const params = new HttpParams()
      .set('limit', limit);

    return this.http.get<Person[]>(this.url, { params });
  }

  createPerson(person: Person): Observable<Person> {
    return this.http
      .post<Person>(`${this.url}/new`, person)
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
