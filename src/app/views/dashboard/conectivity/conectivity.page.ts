import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Connectivity } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-conectivity',
  templateUrl: './conectivity.page.html',
  styleUrls: ['./conectivity.page.scss'],
  standalone: false
})
export class ConectivityPage implements OnInit {

  isLoading = true;
  connectivities: Connectivity[] = []

  constructor(private translate: TranslateService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.isLoading = true;
    console.log('getData start - isLoading:', this.isLoading)
    this.dashboardService.getConnectivity().subscribe({
      next: (response) => {
        this.connectivities = response.data.connectivity;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching connectivity data:', error);
        this.isLoading = false;
      }
    });
  }

}
