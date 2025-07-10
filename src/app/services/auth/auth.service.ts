import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, password });
  }

}
