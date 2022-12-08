import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token, UserCredentials } from '@angular-concert-project/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<UserCredentials | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private readonly TOKEN = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: UserCredentials | undefined) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(formData: UserCredentials) {
      return this.http
      .post<any>(
        `http://localhost:3333/api/login`,
        formData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((data: any) => data.result),
        map((token: Token) => {
          // this.saveUserToLocalStorage(user);
          // this.currentUser$.next(user);
          this.saveTokenToLocalStorage(token);
          return "success";
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  // register(userData: UserInfo): Observable<UserInfo | undefined> {
  //   console.log(
  //     `register at ${this.configService.getConfig().apiEndpoint}user`
  //   );
  //   console.log(userData);
  //   return this.http
  //     .post<UserInfo>(
  //       `${this.configService.getConfig().apiEndpoint}user`,
  //       userData,
  //       {
  //         headers: this.headers,
  //       }
  //     )
  //     .pipe(
  //       map((user) => {
  //         // this.saveUserToLocalStorage(user)
  //         // this.currentUser$.next(user)
  //         this.alertService.success('You have been registered');
  //         return user;
  //       }),
  //       catchError((error) => {
  //         console.log('error:', error);
  //         console.log('error.message:', error.message);
  //         console.log('error.error.message:', error.error.message);
  //         this.alertService.error(error.error.message || error.message);
  //         return of(undefined);
  //       })
  //     );
  // }

  // logout(): void {
  //   this.router
  //     .navigate(['/'])
  //     .then((success) => {
  //       // true when canDeactivate allows us to leave the page.
  //       if (success) {
  //         console.log('logout - removing local user info');
  //         localStorage.removeItem(this.CURRENT_USER);
  //         this.currentUser$.next(undefined);
  //         this.alertService.success('You have been logged out.');
  //       } else {
  //         console.log('navigate result:', success);
  //       }
  //     })
  //     .catch((error) => console.log('not logged out!'));
  // }

  getUserFromLocalStorage(): Observable<UserCredentials | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  private saveTokenToLocalStorage(token: Token): void {
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  // private saveUserToLocalStorage(user: UserInfo): void {
  //   localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  // }

}
