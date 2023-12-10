import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import { User } from "@angular-concert-project/user";
import { AuthService } from "@angular-concert-project/auth-ui";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = 'https://angularschoolproject1-production.up.railway.app/api/users';
  private url = 'http://localhost:3333/api/users';
  private isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url).pipe(
      map(users => users.map(user => ({
        ...user,
        // Convert the bday string to a Date object
        bday: new Date(user.bday)
      })))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + id).pipe(
      map(user => ({
        ...user,
        // Convert the bday string to a Date object
        bday: new Date(user.bday)
      }))
    );
  }

  private checkAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getAdminStatusListener() {
    return this.isAdmin.asObservable();
  }

  checkAdminStatus(): Observable<boolean> {
    return this.httpClient.get<{ isAdmin: boolean }>(this.url + '/isUserAdmin').pipe(
      map(response => {
        const adminStatus = response.isAdmin;
        localStorage.setItem('isAdmin', String(adminStatus));
        this.isAdmin.next(adminStatus);
        return adminStatus;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.url, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
