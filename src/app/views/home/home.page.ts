import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit() {
  }

  setLang(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);  
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
