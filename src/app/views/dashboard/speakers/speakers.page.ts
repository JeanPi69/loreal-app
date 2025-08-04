import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Speaker, SpeakersResponse } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SpeakerDetailPage } from './speaker-detail/speaker-detail.page';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
  standalone: false,
})
export class SpeakersPage implements OnInit {
  speakers: Speaker[] = [];
  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getSpeakers();
  }

  getSpeakers() {
    this.isLoading = true;
    this.dashboardService.getSpeakers().subscribe({
      next: (res) => {
        this.speakers = res.data.speakers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching speakers:', error);
        this.isLoading = false;
      },
    });
  }

  async openSpeakerDetail(speaker: Speaker) {
    const modal = await this.modalCtrl.create({
      component: SpeakerDetailPage,
      componentProps: {
        speaker: speaker,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    await modal.present();
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
