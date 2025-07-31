import { Type } from '@angular/core';

export interface Card {
  img: string;
  description: string;
  component?: Type<any>;
}

export interface ConnectivityResponse {
  success: boolean;
  data:{
    connectivity: Connectivity[];
  };
  error?: string;
}

export interface Connectivity{
  id: number;
  password: string;
  ssid: string;
}

export interface SpeakersResponse {
  success: boolean;
  data: {
    speakers: Speaker[];
  },
  errors?: string;
}

export interface Speaker {
  id: number;
  description: string;
  document: string;
  document2: string;
  document3: string;
  image: string;
  name: string;
  specialty: string;
}

export interface AgendaResponse {
  success: boolean;
  data: {
    agenda: AgendaItem[];
  },
  errors?: string;
}

export interface AgendaItem{
  id: number;
  name: string;
  agenda: Agenda[];
}

export interface Agenda{
  agenda_category_id: number;
  id: number;
  speakers: Speaker[];
  start_date: string;
  subject: string;
}

export interface TourResponse {
  success: boolean;
  data: {
    tours: Tour;
  },
  errors?: string;
}

export interface Tour{
  id: number;
  description: string;
  title: string;
}

export interface RecommendationsResponse {
  success: boolean;
  data:{
    recommendations: RecommendationCategory[];
  }
}

export interface RecommendationCategory {
  id: number;
  category: string;
  image: string;
}

export interface RecommendationsByCategoryResponse{
  success: boolean;
  data: {
    recommendations: Recommendation[];
  }
}

export interface Recommendation {
  id: number;
  address: string;
  created_at: string;
  name: string;
  phone: string;
  recommendation_category_id: number;
  updated_at: string;
  web: string;
}

export interface DestiniesResponse {
  success: boolean;
  data: {
    destinies: CountryData;
  }
}

export interface CountryData{
  id: number;
  description: string;
}

export interface StudiesResponse {
  success: boolean;
  data: {
    studies: Study[];
  }
}

export interface Study{
  id: number;
  name: string;
  url: string;
}