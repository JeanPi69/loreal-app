import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendaResponse, ConnectivityResponse, DestiniesResponse, RecommendationsByCategoryResponse, RecommendationsResponse, SpeakersResponse, StudiesResponse, TourResponse } from 'src/app/models/Dashboard';
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

  getTour(): Observable<TourResponse>{
    return this.http.get<TourResponse>(`${this.url}/tours`);
  }

  getRecommendations(): Observable<RecommendationsResponse>{
    return this.http.get<RecommendationsResponse>(`${this.url}/recommendations`);
  }

  getRecommendationsByCategory(category_id: number): Observable<RecommendationsByCategoryResponse>{
    return this.http.get<RecommendationsByCategoryResponse>(`${this.url}/recommendations/${category_id}`);
  }

  getCountryData(): Observable<DestiniesResponse>{
    return this.http.get<DestiniesResponse>(`${this.url}/destinies`);
  }

  getStudies(): Observable<StudiesResponse>{
    return this.http.get<StudiesResponse>(`${this.url}/studies`);
  }

}
