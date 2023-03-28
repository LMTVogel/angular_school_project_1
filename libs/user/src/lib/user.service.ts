import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import {AuthService} from "@angular-concert-project/auth-ui";
import {User} from "@angular-concert-project/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private readonly authService: AuthService) { }

  private url = 'http://localhost:3333/api/user';

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  getAllUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User[]>(this.url, {
      headers: headers,
    });
  }

  getUserById(userId: string): Observable<User> {
    console.log('get user profile');

    return this.httpClient.get<User>(this.url + '/' + userId, {
      headers: this.authService.constructHeader(),
    });
  }

  getOrganisationsFromUser(): Observable<User> {
    console.log('get organisations from user');

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + "/organisations", {
      headers: headers,
    });
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
