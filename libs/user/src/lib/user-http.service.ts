import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "@angular-concert-project/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {
    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3333/api/users/');
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`http://localhost:3333/api/users/${id}`);
    }
}