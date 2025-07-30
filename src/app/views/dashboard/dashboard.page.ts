import { Component, OnInit, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/Login';
import { ConectivityPage } from './conectivity/conectivity.page';
import { Card } from 'src/app/models/Dashboard';
import { SpeakersPage } from './speakers/speakers.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  user!: User;

  cards: Card[] = [
    {
      img: '../../../assets/dashboard/cards/agenda.png',
      description: 'HOME.DIARY'
    },
    {
      img: '../../../assets/dashboard/cards/connectivity.png',
      description: 'HOME.CONNECTIVITY',
      component: ConectivityPage,
    },
    {
      img: '../../../assets/dashboard/cards/expositores.png',
      description: 'HOME.EXHIBITORS',
      component: SpeakersPage
    },
    {
      img: '../../../assets/dashboard/cards/mapa.png',
      description: 'HOME.MAP',
    },
    {
      img: '../../../assets/dashboard/cards/media.png',
      description: 'HOME.MEDIA',
    },
    {
      img: '../../../assets/dashboard/cards/social.png',
      description: 'HOME.SOCIAL',
    },
    {
      img: '../../../assets/dashboard/cards/tour.png',
      description: 'HOME.TOUR',
    },
    {
      img: '../../../assets/dashboard/cards/trivia.png',
      description: 'HOME.TRIVIA',
    },
    {
      img: '../../../assets/dashboard/cards/scientific.png',
      description: 'HOME.SCIENTIFIC',
    },
    {
      img: '../../../assets/dashboard/cards/peru.png',
      description: 'HOME.PERU',
    },
    {
      img: '../../../assets/dashboard/cards/recommendations.png',
      description: 'HOME.RECOMMENDATIONS',
    },
  ];

  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  async openCardModal(component?: Type<any>) {
    if(!component) return;
    const modal = await this.modalCtrl.create({
      component,
      breakpoints: [1],
      initialBreakpoint: 1,
    });
    await modal.present();
  }
}
