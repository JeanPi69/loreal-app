import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    });
    console.log('Intentando loguear');
    console.log('URL:', `${this.url}/login`);
    return this.http.post<LoginResponse>(
      `${this.url}/login`,
      { email, password },
      { headers }
    );
  }

  logout() {
    return this.http.post(`${this.url}/admin/logout`, {});
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.url}/forgot-password`, { email });
  }
}
