import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "@angular-concert-project/user";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token) {
      // If there is no token in localStorage, navigate to not authorized page
      this.router.navigate(['/not-authorized']);
      return false;
    } else if (token && isAdmin === 'true') {
      // If there is a token and the user is an admin, allow access
      return true;
    } else if (token && isAdmin === 'false') {
      // if the token is filled but the user is not an admin, the not authorized page is shown
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return false;
  }
}
