import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { AgendaItem } from '../../../models/Dashboard';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {
  selectedDate = '2023-09-22';
  agenda: AgendaItem[] = [];

  constructor(private dashboardService: DashboardService, private translate: TranslateService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('AGENDA.LOADING'),
    });
    await loading.present();
    this.dashboardService.getAgenda(this.selectedDate).subscribe((res) => {
      this.agenda = res.data.agenda;
      loading.dismiss();
    });
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.getData();
  }

  getDateLabel(): string {
    if (this.selectedDate === '2023-09-22') {
      return this.translate.instant('AGENDA.FRIDAY') + ' 22';
    } else {
      return this.translate.instant('AGENDA.SATURDAY') + ' 23';
    }
  }
}
