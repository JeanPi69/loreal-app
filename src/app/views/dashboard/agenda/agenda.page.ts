import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { AgendaItem } from '../../../models/Dashboard';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {
  selectedDate = '2023-09-22';
  agenda: AgendaItem[] = [];

  isLoading = true;

  constructor(private dashboardService: DashboardService, private translate: TranslateService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    this.dashboardService.getAgenda(this.selectedDate).subscribe((res) => {
      this.agenda = res.data.agenda;
      this.isLoading = false;
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

  modalDismiss(){
    this.modalCtrl.dismiss();
  }

}
