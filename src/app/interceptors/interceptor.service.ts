import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    const language = localStorage.getItem('lang') || 'es';

    const headers: any = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Clonar la petición con los headers adecuados
    request = request.clone({
      setHeaders: headers,
      setParams: {
        language: language,
      },
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        async (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status !== 401 && error.status !== 403) {
              return;
            }

            await this.closeAllOverlays();

            this.clearUserData();

            await this.showSessionExpiredMessage();

            this.router.navigate(['/login']);
          }
        }
      )
    );
  }

  private async closeAllOverlays() {
    try {
      while (await this.modalCtrl.getTop()) {
        await this.modalCtrl.dismiss();
      }

      while (await this.loadingCtrl.getTop()) {
        await this.loadingCtrl.dismiss();
      }

      while (await this.toastCtrl.getTop()) {
        await this.toastCtrl.dismiss();
      }
    } catch (error) {
      console.error('Error closing overlays:', error);
    }
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
  }

  private async showSessionExpiredMessage() {
    try {
      const toast = await this.toastCtrl.create({
        message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        duration: 4000,
        position: 'top',
        color: 'warning',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });

      await toast.present();
    } catch (error) {
      console.error('Error showing session expired message:', error);
    }
  }
}
