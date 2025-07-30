import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.page.html',
  styleUrls: ['./menu-layout.page.scss'],
  standalone: false,
})
export class MenuLayoutPage implements OnInit {
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private popOverCtrl: PopoverController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

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
}
