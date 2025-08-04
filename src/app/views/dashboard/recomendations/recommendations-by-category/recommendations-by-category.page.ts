import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  Recommendation,
  RecommendationCategory,
} from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recommendations-by-category',
  templateUrl: './recommendations-by-category.page.html',
  styleUrls: ['./recommendations-by-category.page.scss'],
  standalone: false,
})
export class RecommendationsByCategoryPage implements OnInit {
  @Input() category!: RecommendationCategory;

  isLoading = true;

  recommendations: Recommendation[] = [];

  constructor(private dashboardService: DashboardService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getRecommendationsByCategory();
  }

  getRecommendationsByCategory() {
    this.isLoading = true;
    this.dashboardService
      .getRecommendationsByCategory(this.category.id)
      .subscribe({
        next: (res) => {
          console.log('Recommendations by category:', res);
          this.recommendations = res.data.recommendations;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching recommendations by category:', error);
          this.isLoading = false;
        },
      });
  }

  async openUrl(url: string) {
    if (Capacitor.isNativePlatform()) {
      await Browser.open({ url: url, windowName: '_system' });
    } else {
      window.open(url, '_blank');
    }
  }

  openMaps(address: string) {
    const encodedAddress = encodeURIComponent(address);

    if (Capacitor.getPlatform() === 'ios') {
      // iOS - Intentar Apple Maps primero, si falla usar Google Maps
      const appleUrl = `maps://maps.apple.com/?q=${encodedAddress}`;
      const googleUrl = `https://maps.google.com/?q=${encodedAddress}`;

      // Intentar Apple Maps, si no está instalado usar Google Maps
      window.open(appleUrl, '_system') || window.open(googleUrl, '_system');
    } else if (Capacitor.getPlatform() === 'android') {
      // Android - Google Maps
      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_system');
    } else {
      // Web - Google Maps en nueva pestaña
      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    }
  }

  makeCall(phoneNumber: string) {
    try {
      // Limpiar el número de teléfono de caracteres especiales
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
      if (Capacitor.isNativePlatform()) {
        // En dispositivo móvil, abrir la app de llamadas
        window.open(`tel:${cleanPhone}`, '_system');
      } else {
        // En web, intentar abrir la aplicación de teléfono
        window.location.href = `tel:${cleanPhone}`;
      }
    } catch (error) {
      console.error('Error making call:', error);
    }
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
