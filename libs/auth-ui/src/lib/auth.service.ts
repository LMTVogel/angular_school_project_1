import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, Observable, of, BehaviorSubject } from "rxjs";
import { UserCredentials } from "./auth.interface";
import {User} from "@angular-concert-project/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  private url = 'https://angularschoolproject1-production.up.railway.app/auth';

  constructor(private httpClient: HttpClient) { }

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthStatusListener() {
    return this.loggedIn.asObservable();
  }

  updateAuthStatus() {
    this.loggedIn.next(this.checkToken());
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  login(user: UserCredentials): Observable<string> {
    console.log('login user service');
    return this.httpClient.post<string>(this.url + '/login', user);
  }

  constructHeader() {
    let token;

    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token') || '');
    } else {
      throw new Error('No token found');
    }

    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });
  }
  register(userToCreate: UserCredentials): Observable<UserCredentials> {
    console.log('register user');

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.post<UserCredentials>(this.url + '/register', userToCreate, {
      headers: headers,
    })
      .pipe(
        catchError((error) => {
          console.log('error: ', error);
          return of(error);
        })
      );
  }

  logOut(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return false;
  }

  getLoggedInUser(): Observable<User> {
    console.log('get logged in user');

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + "/info", {
      headers: headers,
    })
  }
}
