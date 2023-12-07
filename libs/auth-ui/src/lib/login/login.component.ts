import {User, UserCredentials} from '@angular-concert-project/user';
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
  userLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
    };
  }

  onSubmit(): void {
    console.log('Login form submitted');
    this.authService.login(this.user).subscribe((result: any | undefined) => {
      if (result.error) {
        console.log(result.error)
        this.wrongLogin = true;
      } else {
        console.log('User login successful');
        this.wrongLogin = false;
        localStorage.setItem('token', JSON.stringify(result.token) || '');
        this.authService.getLoggedInUser().subscribe((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
        });

        this.authService.updateAuthStatus();
        this.router.navigate(['']);
      }
    });
  }
}
