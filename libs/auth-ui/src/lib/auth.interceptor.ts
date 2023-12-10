import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private whitelist = [
    '/login',
    '/concerts-overview',
    '/about',
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('AuthInterceptor: ' + req.url)
    // Check if the request is whitelisted for not needing a token.
    if (this.whitelist.some(url => req.url.includes(url))) {
      console.log('AuthInterceptor: Whitelisted URL, no token needed.')
      return next.handle(req);
    }

    // Get the auth token from the service.
    const token = this.authService.getToken()

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token)
        .set('Access-Control-Allow-Origin', '*')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq)
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
