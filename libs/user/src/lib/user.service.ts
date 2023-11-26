import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import {AuthService} from "@angular-concert-project/auth-ui";
import {User} from "@angular-concert-project/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3333/api/user';

  constructor(private httpClient: HttpClient, private readonly authService: AuthService) { }

  users: User[] = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', bday: new Date('1990-01-01'), isAdmin: true },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', bday: new Date('1985-02-02'), isAdmin: false },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', bday: new Date('1992-03-03'), isAdmin: false },
    { id: '4', name: 'Diana Evans', email: 'diana@example.com', bday: new Date('1988-04-04'), isAdmin: true },
    { id: '5', name: 'Ethan Harris', email: 'ethan@example.com', bday: new Date('1991-05-05'), isAdmin: false },
    { id: '6', name: 'Fiona King', email: 'fiona@example.com', bday: new Date('1989-06-06'), isAdmin: false },
    { id: '7', name: 'George Lee', email: 'george@example.com', bday: new Date('1993-07-07'), isAdmin: true },
    { id: '8', name: 'Hannah Martin', email: 'hannah@example.com', bday: new Date('1987-08-08'), isAdmin: false },
    { id: '9', name: 'Ian Clark', email: 'ian@example.com', bday: new Date('1995-09-09'), isAdmin: false },
    { id: '10', name: 'Julia Young', email: 'julia@example.com', bday: new Date('1986-10-10'), isAdmin: true }
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  // getAllUsers(): Observable<User[]> {
  //   const token = this.getToken();
  //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     Authorization: `${token}`,
  //   });

  //   return this.httpClient.get<User[]>(this.url, {
  //     headers: headers,
  //   });
  // }

  // getUserById(userId: string): Observable<User> {
  //   console.log('get user profile');

  //   return this.httpClient.get<User>(this.url + '/' + userId, {
  //     headers: this.authService.constructHeader(),
  //   });
  // }

  // getOrganisationsFromUser(): Observable<User> {
  //   console.log('get organisations from user');

  //   const token = this.getToken();
  //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     Authorization: `${token}`,
  //   });

  //   return this.httpClient.get<User>(this.url + "/organisations", {
  //     headers: headers,
  //   });
  // }

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
