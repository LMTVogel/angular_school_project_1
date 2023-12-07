// import { HTTP_INTERCEPTORS } from '@angular/common/http'
// import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
// import { Injectable } from '@angular/core'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private whitelist = [
    '/login',
  ];

//     // Clone the request and replace the original headers with
//     // cloned headers, updated with the authorization.
//     const authReq = req.clone({
//       setHeaders: { Authorization: 'Bearer ' + authToken }
//     })

//     // send cloned request with header to the next handler.
//     return next.handle(authReq)
//   }
// }

// /**
//  * Http interceptor providers in outside-in order
//  * https://angular.io/guide/http#interceptor-order
//  */
// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ]
