import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('AuthInterceptor')
    // Get the auth token from the service.
    const token = this.authService.getToken()

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token)
          .set('Access-Control-Allow-Origin', '*')
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
