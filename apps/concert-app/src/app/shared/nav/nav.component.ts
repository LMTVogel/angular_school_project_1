import { Component, OnInit } from '@angular/core';
import { AuthService } from "@angular-concert-project/auth-ui";
import {Router} from "@angular/router";

@Component({
  selector: 'angular-concert-project-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout() {
    this.router.navigate(['']);
    this.isLoggedIn = this.authService.logOut();
  }
}
