import { Component, OnInit } from '@angular/core';
import { AuthService } from "@angular-concert-project/auth-ui";

@Component({
  selector: 'angular-concert-project-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.isLoggedIn = this.authService.logOut();
  }
}
