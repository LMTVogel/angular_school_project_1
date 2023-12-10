import {User, UserCredentials, UserService} from '@angular-concert-project/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@angular-concert-project/auth-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: UserCredentials;
  wrongLogin = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
  }

  onSubmit(): void {
    console.log('Login form submitted');
    this.authService.login(this.user).subscribe({
      next: (result: any) => {
        if (result && result.token) {
          console.log('User login successful');
          this.wrongLogin = false;
          localStorage.setItem('token', JSON.stringify(result.token));

          this.authService.updateAuthStatus();
          this.router.navigate(['']);
        } else {
          console.log(result.error);
          this.wrongLogin = true; // Set wrongLogin to true if login is unsuccessful
        }
      },
      error: (error) => {
        console.error('An error occurred during login: ', error);
        this.wrongLogin = true; // Also set wrongLogin to true in case of an error
      }
    });
  }
}
