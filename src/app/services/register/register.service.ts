import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesResponse } from 'src/app/models/Register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<CountriesResponse>{
    return this.http.get<CountriesResponse>(`${this.url}/register/countries`); 
  }

}
