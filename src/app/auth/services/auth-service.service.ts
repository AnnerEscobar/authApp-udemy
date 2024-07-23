import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, Loginresponse } from '../interfaces/index'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl: string = enviroments.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<Loginresponse>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.aunthenticated);
          localStorage.setItem('token', token);
          console.log({ user, token })
        }),

        map(() => true),
        catchError(e => {
          console.log(e);
          return throwError(() => 'Algo no sucedio como lo esperaba');
        })
      );

  }

}
