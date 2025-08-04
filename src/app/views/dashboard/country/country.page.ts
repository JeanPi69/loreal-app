import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryData } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
  standalone: false,
})
export class CountryPage implements OnInit {
  country!: CountryData;
  isLoading = true;

  constructor(private dashboardService: DashboardService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getCountryData();
  }

  getCountryData() {
    this.isLoading = true;
    this.dashboardService.getCountryData().subscribe({
      next: (data) => {
        this.country = data.data.destinies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching country data:', error);
        this.isLoading = false; 
      },
    });
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  } 

}
