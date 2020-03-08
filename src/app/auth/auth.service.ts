import { tap, map, catchError } from 'rxjs/operators';
import { Observable, pipe, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3333/auth';

  private subjectUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjectLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http
      .post<User>(`${this.url}/login`, credentials)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('token', user.token);
          this.subjectLogged$.next(true);
          this.subjectUser$.next(user);
          this.getUser();
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token && !this.subjectLogged$.value) {
      return this.checkTokenValidation();
    }

    return this.subjectLogged$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http
      .get<User>(`${this.url}/session`)
      .pipe(
        tap((u: User) => {
          if (u) {
            localStorage.setItem('token', u.token);
            this.subjectLogged$.next(true);
            this.subjectUser$.next(u);
          }
        }),
        map((u: User) => u ? true : false),
        catchError(() => {
          this.logout();
          return of(false);
        })
      )
  }

  getUser(): Observable<User> {
    return this.subjectUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjectLogged$.next(false);
    this.subjectUser$.next(null);
  }
}
