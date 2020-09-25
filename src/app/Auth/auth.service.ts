import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from  'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from  './user';
import { AuthResponse } from  './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://127.0.0.1:8000';
  authSubject  =  new  BehaviorSubject(false);
  authResponse : AuthResponse;
  constructor(
    public httpClient : HttpClient
    ) { }

  register(user: User): Observable<AuthResponse> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/register`, user, {headers});
  }

  login(user: User): Observable<AuthResponse> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/login`, user, {headers});
  }

}
