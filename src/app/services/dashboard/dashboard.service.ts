import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectivityResponse, SpeakersResponse } from 'src/app/models/Dashboard';
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

}
