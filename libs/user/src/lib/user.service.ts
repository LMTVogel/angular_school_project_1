import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import { User } from "@angular-concert-project/user";
import { AuthService } from "@angular-concert-project/auth-ui";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://angularschoolproject1-production.up.railway.app/api/users';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

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

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url).pipe(
      map(users => users.map(user => ({
        ...user,
        // Convert the bday string to a Date object
        bday: new Date(user.bday)
      })))
    );
  }

  getUserById(id: string): User {
    return this.users.filter((user) => user.id === id)[0];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  editUser(user: User): void {
    const userToEdit = this.users.findIndex((u) => u.id === user.id);
    this.users[userToEdit] = user;
  }

  deleteUser(id: string): void {
    const userToDelete = this.users.findIndex((user) => user.id === id);
    this.users.splice(userToDelete, 1);
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
}
