import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseApiService {
  private baseUrl: string;
  public httpClient: HttpClient = inject(HttpClient);
  constructor(private baseApi: string = '') {
    this.baseUrl = environment.SPOTIFY_API_BASE_PATH + baseApi;
  }
  public get<T>(url: string, options?: Object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.get<T>(url, options);
  }

  public post<T>(url: string, body?: Object, options?: Object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.post<T>(url, body, options);
  }

  public put<T>(url: string, body?: Object, options?: Object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.put<T>(url, body, options);
  }

  public delete<T>(url: string, options?: Object): Observable<T> {
    url = this.baseUrl + url;
    return this.httpClient.delete<T>(url, options);
  }
}
