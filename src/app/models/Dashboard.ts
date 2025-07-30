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
}