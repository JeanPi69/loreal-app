import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendaResponse, ConnectivityResponse, SpeakersResponse } from 'src/app/models/Dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getConnectivity(): Observable<ConnectivityResponse>{
    return this.http.get<ConnectivityResponse>(`${this.url}/connectivity`);
  }

  getSpeakers(): Observable<SpeakersResponse>{
    return this.http.get<SpeakersResponse>(`${this.url}/speakers`);
  }

  getAgenda(date: string): Observable<AgendaResponse>{
    const defaultDate = '2023-09-22';
    const selectedDate = date || defaultDate;
    let params = new HttpParams().set('date', selectedDate);
    return this.http.get<AgendaResponse>(`${this.url}/agenda`, {params});
  }

}
