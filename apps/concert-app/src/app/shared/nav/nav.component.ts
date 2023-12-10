import { Component, OnInit } from '@angular/core';
import { AuthService } from "@angular-concert-project/auth-ui";
import { UserService } from "@angular-concert-project/user";
import { Router } from "@angular/router";
@Component({
  selector: 'angular-concert-project-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      // If authenticated, check for admin status
      if (isAuthenticated) {
        this.userService.getAdminStatusListener().subscribe(isAdmin => {
          this.isAdmin = isAdmin;
        });
      }
    });
  }

  logout() {
    this.router.navigate(['']);
    this.isLoggedIn = this.authService.logOut();
  }
}
