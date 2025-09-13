import { Component, OnInit, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/Login';
import { ConectivityPage } from './conectivity/conectivity.page';
import { Card } from 'src/app/models/Dashboard';
import { SpeakersPage } from './speakers/speakers.page';
import { AgendaPage } from './agenda/agenda.page';
import { RecomendationsPage } from './recomendations/recomendations.page';
import { MapsPage } from './maps/maps.page';
import { CountryPage } from './country/country.page';
import { PhotosPage } from './photos/photos.page';
import { TravelPage } from './travel/travel.page';

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
      description: 'HOME.TRAVEL',
      component: TravelPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-agenda.png',
      description: 'HOME.DIARY',
      component: AgendaPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-expositores.png',
      description: 'HOME.EXHIBITORS',
      component: SpeakersPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-colombia.png',
      description: 'HOME.COLOMBIA',
      component: CountryPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-recomendaciones.png',
      description: 'HOME.RECOMMENDATIONS',
      component: RecomendationsPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-mapa.png',
      description: 'HOME.MAP',
      component: MapsPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-redes-wifi.png',
      description: 'HOME.CONNECTIVITY',
      component: ConectivityPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-fotos-y-videos.png',
      description: 'HOME.MEDIA',
      component: PhotosPage,
    },
    {
      img: '../../../assets/dashboard/cards/icono-trivia.png',
      description: 'HOME.TRIVIA',
    },
  ];

  currentPage = 0;
  itemsPerPage = 6;
  totalPages = 0;

  constructor(
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.totalPages = Math.ceil(this.cards.length / this.itemsPerPage);
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  async openCardModal(component?: Type<any>) {
    if (!component) return;
    const modal = await this.modalCtrl.create({
      component,
      /*       breakpoints: [1],
      initialBreakpoint: 1, */
    });
    await modal.present();
  }

  toggleShowAllCards() {
    this.showAllCards = !this.showAllCards;
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
