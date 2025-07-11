import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/Login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  user!: User;

  cards = [
    { img: '../../../assets/dashboard/cards/agenda.png', description: 'HOME.DIARY' , url: ''},
    { img: '../../../assets/dashboard/cards/connectivity.png', description: 'HOME.CONNECTIVITY' , url: ''},
    { img: '../../../assets/dashboard/cards/expositores.png', description: 'HOME.EXHIBITORS' , url: ''},
    { img: '../../../assets/dashboard/cards/mapa.png', description: 'HOME.MAP' , url: ''},
    { img: '../../../assets/dashboard/cards/media.png', description: 'HOME.MEDIA' , url: ''},
    { img: '../../../assets/dashboard/cards/social.png', description: 'HOME.SOCIAL' , url: ''},
    { img: '../../../assets/dashboard/cards/tour.png', description: 'HOME.TOUR' , url: ''},
    { img: '../../../assets/dashboard/cards/trivia.png', description: 'HOME.TRIVIA' , url: ''},
    { img: '../../../assets/dashboard/cards/scientific.png', description: 'HOME.SCIENTIFIC' , url: ''},
    { img: '../../../assets/dashboard/cards/peru.png', description: 'HOME.PERU' , url: ''},
    { img: '../../../assets/dashboard/cards/recommendations.png', description: 'HOME.RECOMMENDATIONS' , url: ''}
  ]

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

}
