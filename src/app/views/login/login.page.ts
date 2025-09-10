import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  forgetPassword = false;

  email: string = 'tecnologia@billex.pe';
  password: string = 'password';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.loginForm = this.fb.group({
      email: ['tecnologia@billex.pe', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    });
    this.setupKeyboard();
  }

  ngOnInit() {}

  async setupKeyboard() {
    if (this.platform.is('capacitor')) {
      // Configuración explícita del plugin
      try {
        await Keyboard.setResizeMode({ mode: KeyboardResize.None });
        await Keyboard.setScroll({ isDisabled: true });
        
        Keyboard.addListener('keyboardWillShow', () => {
          document.body.classList.add('keyboard-is-open');
        });
        
        Keyboard.addListener('keyboardWillHide', () => {
          document.body.classList.remove('keyboard-is-open');
        });
      } catch (err) {
        console.error('Error configurando el teclado:', err);
      }
    }
  }

  /* async login(){
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
  } */

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Por favor ingresa tu correo y contraseña');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}
