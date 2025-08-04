import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tour } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
  standalone: false,
})
export class TourPage implements OnInit {
  tour!: Tour;
  isLoading = true;

  constructor(private dashboardService: DashboardService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getTours();
  }

  getTours() {
    this.isLoading = true;
    this.dashboardService.getTour().subscribe({
      next: (response) => {
        console.log('Tour data:', response);
        if (response.success) {
          this.tour = response.data.tours;
          this.isLoading = false;
        } else {
          console.error('Failed to fetch tours:', response.errors);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching tour data:', error);
        this.isLoading = false;
      },
    });
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
