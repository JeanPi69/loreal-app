import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Study } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-scientific',
  templateUrl: './scientific.page.html',
  styleUrls: ['./scientific.page.scss'],
  standalone: false,
})
export class ScientificPage implements OnInit {
  isLoading = true;

  studies: Study[] = [];

  studyImages: {[key:string]: string} = {
    '1': 'assets/dashboard/studies/cerave.png',
    '2': 'assets/dashboard/studies/laroche.png',
    '3': 'assets/dashboard/studies/skinceuticals.png',
    '4': 'assets/dashboard/studies/vichy.png',
  }

  constructor(
    private dashboardService: DashboardService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getStudies();
  }

  getStudies() {
    this.isLoading = true;
    this.dashboardService.getStudies().subscribe({
      next: (response) => {
        this.studies = response.data.studies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching studies:', error);
        this.isLoading = false;
      },
    });
  }

  getStudyImage(studyId: number) {
    return this.studyImages[studyId];
  }

  async downloadStudy(study: Study) {
    if (!study.url) {
      await this.showToast('URL no disponible para este estudio', 'warning');
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Abriendo link...'
    });

    try {
      await loading.present();

      let url = study.url;
      
      // Asegurar protocolo
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      if (Capacitor.isNativePlatform()) {
        await Browser.open({ 
          url: url,
          windowName: '_system'
        });
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }

      await loading.dismiss();
      
    } catch (error) {
      await loading.dismiss();
      console.error('Error opening study:', error);
      await this.showToast('Error al abrir el estudio', 'danger');
    }

  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
