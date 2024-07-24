import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { catchError, from, map, Observable, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, Loginresponse } from '../interfaces/index'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckTokenResponse } from '../interfaces/index';

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
          return throwError(() => 'Correo o Contrasenia incorrecto');
        })
      );

  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.aunthenticated);
          localStorage.setItem('token', token);
          console.log({ user, token })

          return true;
        }),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticade);
         return of(false);
        })
      )

  }

}
