import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
  standalone: false,
})
export class TravelPage implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private modalCtrl: ModalController, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getTripData();
  }

  getTripData(){
    this.dashboardService.getTripData(this.user.id).subscribe(res=>{
      console.log('res', res);
    });
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
