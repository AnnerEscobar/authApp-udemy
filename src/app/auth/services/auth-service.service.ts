import { inject, Injectable, signal } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl: string = enviroments.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthSatus>();


  constructor() { }

  login(email:string, password:string):Observable<boolean>{

    return of(true);

  }

}
