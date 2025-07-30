import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonContent } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(private translate: TranslateService, private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  setLang(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);  
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  async openRegister(){
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      initialBreakpoint: 1,
      breakpoints: [0,1]
    });
    await modal.present();
  }

}
