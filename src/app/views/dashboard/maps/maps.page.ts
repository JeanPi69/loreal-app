import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {
  isLoading = true;

  mapUrl: SafeResourceUrl;

  private latitude = -12.0464;
  private longitude = -77.0428;
  private locationName = 'Hotel Marriott Lima';
  private address = 'Malecón de la Reserva 615, Miraflores, Lima, Perú';

  constructor(
    private sanitizer: DomSanitizer,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {
    this.mapUrl = this.getEmbedMapUrl();
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private getEmbedMapUrl(): SafeResourceUrl {
    // URL para Google Maps embebido
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${this.latitude},${this.longitude}&zoom=16&maptype=roadmap`;

    // Si no tienes API key, usar la versión pública (menos opciones)
    const publicUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3!2d${this.longitude}!3d${this.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAyJzQ3LjAiUyA3N8KwMDInMzQuMCJX!5e0!3m2!1sen!2spe!4v1609459200000!5m2!1sen!2spe`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(publicUrl);
  }

  async openInMapsApp() {
    try {
      const url = this.getMapAppUrl();

      if (Capacitor.isNativePlatform()) {
        window.open(url, '_system');
      } else {
        window.open(
          `https://maps.google.com/?q=${this.latitude},${this.longitude}`,
          '_blank'
        );
      }
    } catch (error) {
      console.error('Error opening maps app:', error);
      await this.showToast('Error al abrir la aplicación de mapas');
    }
  }

  private getMapAppUrl(): string {
    const encodedAddress = encodeURIComponent(this.address);

    if (Capacitor.getPlatform() === 'ios') {
      return `maps://maps.apple.com/?q=${encodedAddress}&ll=${this.latitude},${this.longitude}`;
    } else {
      return `geo:${this.latitude},${this.longitude}?q=${encodedAddress}`;
    }
  }

  async shareLocation() {
    try {
      const shareData = {
        title: this.locationName,
        text: `Ubicación: ${this.address}`,
        url: `https://maps.google.com/?q=${this.latitude},${this.longitude}`,
      };

      if (Capacitor.isNativePlatform()) {
        await Share.share(shareData);
      } else {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(shareData.url);
          await this.showToast('Enlace copiado al portapapeles');
        }
      }
    } catch (error) {
      console.error('Error sharing location:', error);
      await this.showToast('Error al compartir ubicación');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
