import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangePasswordPage } from 'src/app/views/dashboard/change-password/change-password.page';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.page.html',
  styleUrls: ['./menu-layout.page.scss'],
  standalone: false,
})
export class MenuLayoutPage implements OnInit {
  user: any;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private popOverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  setLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  async logout() {
    await this.popOverCtrl.dismiss();
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('AUTH.LOGOUT.LOGOUT_LOADING'),
    });
    await loading.present();
    this.authService.logout().subscribe({
      next: async (res: any) => {
        if (res.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['']);
          await loading.dismiss();
        }
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

  async openChangePasswordModal(){
    await this.popOverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ChangePasswordPage,
      initialBreakpoint: 1,
      breakpoints: [1],
    });
    await modal.present();
  }

}
