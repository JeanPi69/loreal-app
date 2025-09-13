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
    private toastCtrl: ToastController,
    private platform: Platform
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log('INTERCEPTOR - PETICIÓN ENTRANTE:', {
      url: request.url,
      method: request.method,
      body: request.body,
      platforms: this.platform.platforms() // Ver qué plataforma hace la petición
    });

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

    console.log('INTERCEPTOR - HEADERS CONFIGURADOS:', {
      headers: request.headers.keys().map(key => `${key}: ${request.headers.get(key)}`),
      params: request.params.keys().map(key => `${key}: ${request.params.get(key)}`)
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('INTERCEPTOR - RESPUESTA OK:', {
              url: event.url,
              status: event.status,
              statusText: event.statusText,
              body: event.body
            });
          }
        },
        async (error: any) => {
          // LOG #4: Errores detallados
          console.error('INTERCEPTOR - ERROR:', {
            error,
            url: request.url,
            status: error?.status,
            message: error?.message,
            error_details: error?.error,
            platforms: this.platform.platforms()
          });
          if (error instanceof HttpErrorResponse) {
            if (error.status === 419) {
              console.error('INTERCEPTOR - ERROR 419 (CSRF/EXPIRED):', {
                headers_sent: request.headers.keys(),
                response_headers: error.headers?.keys(),
                url: request.url,
                platforms: this.platform.platforms()
              });
            }
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
