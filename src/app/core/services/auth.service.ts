import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../models/auth-response';
import { AUTH_TOKEN_KEY } from '../constants/auth-token-key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient = new HttpClient(this.handler);
  constructor(private handler: HttpBackend) {}

  public authenticate(): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.PUBLIC_KEY);
    body.set('client_secret', environment.PRIVATE_KEY);

    return this.httpClient
      .post<AuthResponse>(environment.AUTH_API_BASE_PATH, body, { headers })
      .pipe(
        tap((response) =>
          sessionStorage.setItem(AUTH_TOKEN_KEY, response.access_token)
        ),
        catchError((error) => {
          sessionStorage.removeItem(AUTH_TOKEN_KEY);
          throw error;
        })
      );
  }
}
