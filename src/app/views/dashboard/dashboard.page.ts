import { Component, OnInit, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/Login';
import { ConectivityPage } from './conectivity/conectivity.page';
import { Card } from 'src/app/models/Dashboard';
import { SpeakersPage } from './speakers/speakers.page';
import { AgendaPage } from './agenda/agenda.page';
import { TourPage } from './tour/tour.page';
import { RecomendationsPage } from './recomendations/recomendations.page';
import { MapsPage } from './maps/maps.page';
import { CountryPage } from './country/country.page';
import { PhotosPage } from './photos/photos.page';
import { SocialPage } from './social/social.page';
import { ScientificPage } from './scientific/scientific.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  user!: User;

  showAllCards = false;
  cards: Card[] = [
    {
      img: '../../../assets/dashboard/cards/icono-viaje.png', 
      description: ''
    },
    {
      img: '../../../assets/dashboard/cards/icono-agenda.png',
      description: '',
      component: AgendaPage
    },
    {
      img: '../../../assets/dashboard/cards/expositores.png',
      description: 'HOME.EXHIBITORS',
      component: SpeakersPage
    },
    {
      img: '../../../assets/dashboard/cards/peru.png',
      description: 'HOME.PERU',
      component: CountryPage
    },
    {
      img: '../../../assets/dashboard/cards/recommendations.png',
      description: 'HOME.RECOMMENDATIONS',
      component: RecomendationsPage
    },
    {
      img: '../../../assets/dashboard/cards/mapa.png',
      description: 'HOME.MAP',
      component: MapsPage
    },
    {
      img: '../../../assets/dashboard/cards/connectivity.png',
      description: 'HOME.CONNECTIVITY',
      component: ConectivityPage,
    },
    {
      img: '../../../assets/dashboard/cards/media.png',
      description: 'HOME.MEDIA',
      component: PhotosPage
    },
    {
      img: '../../../assets/dashboard/cards/trivia.png',
      description: 'HOME.TRIVIA',
    }
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

  toggleShowAllCards() {
    this.showAllCards = !this.showAllCards;
  }

}
