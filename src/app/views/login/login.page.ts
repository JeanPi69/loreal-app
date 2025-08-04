import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  forgetPassword = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private loadingCtrl: LoadingController, private alertCtrl: AlertController,private translate: TranslateService) { 
    this.loginForm = this.fb.group({
      email: ['giancarlo.paoli@billex.pe', [Validators.required, Validators.email]],
      password: ['password',Validators.required]
    });
  }

  ngOnInit() {
  }

  async login(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant('AUTH.LOGIN.LOGIN_LOADING'),
    });
    await loading.present();
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: async res=>{
        if(!res.success){
          await loading.dismiss();
          return;
        }
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        await loading.dismiss();
        this.loginForm.reset();
        this.loginForm.markAsPristine();
        this.router.navigate(['/menu-layout/dashboard']);
      },
      error: async err => {
        await loading.dismiss();
        if (err.status === 401 || err.status === 403) {
          const alert = await this.alertCtrl.create({
            header: 'Login Failed',
            message: err.errors ? err.errors : this.translate.instant('ERRORS.LOGIN_FAILED'),
            buttons: ['OK']
          });
          await alert.present();
          this.loginForm.reset();
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: err.errors ? err.errors : this.translate.instant('ERRORS.UNEXPECTED_ERROR'),
            buttons: ['OK']
          });
          await alert.present();
          this.loginForm.reset();
        }
      }
    }); 
  }

  backToHome(){
    this.router.navigate(['/home']);
  }

}
